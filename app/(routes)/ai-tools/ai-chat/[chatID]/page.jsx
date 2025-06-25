"use client";
import React, { useState, useRef, useEffect } from "react";
import { Button } from "../../../../components/ui/button.jsx";
import { Send, Bot, User, Plus, MessageCircle, History } from "lucide-react";
import { Input } from "../../../../components/ui/input.jsx";
import Sidebar from "../../../dashboard/components/Sidebar";
import { useUser } from "@clerk/nextjs";
import { v4 as uuidv4 } from "uuid";
import { useParams, useRouter } from "next/navigation";

const AiChat = () => {
  const { user } = useUser();
  const params = useParams();
  const router = useRouter();
  const chatId = params.chatId;

  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [chatSessions, setChatSessions] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef(null);

  // Recommended questions
  const recommendedQuestions = [
    "What skills should I develop for my dream job?",
    "How do I transition to a new career field?",
    "What are the highest paying careers in tech?",
    "How can I improve my resume for better job prospects?",
    "What interview questions should I prepare for?",
    "How do I negotiate a better salary?",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const startNewChat = () => {
    const newChatId = uuidv4();
    router.push(`/ai-tools/ai-chat/${newChatId}`);
  };
  const loadChatHistory = async () => {
    if (!user?.id) return;

    try {
      const response = await fetch('/api/chat-sessions');
      const data = await response.json();
      
      if (data.sessions) {
        setChatSessions(data.sessions);
      }
    } catch (error) {
      console.error('Error loading chat history:', error);
    }
  };

  const loadChatMessages = async (sessionId) => {
    try {
      const response = await fetch(`/api/chat-messages?sessionId=${sessionId}`);
      const data = await response.json();
      
      if (data.messages) {
        const formattedMessages = data.messages.map(msg => ({
          id: msg.id,
          type: msg.type,
          content: msg.content,
          timestamp: new Date(msg.created_at).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        }));
        setMessages(formattedMessages);
      } else {
        // If no messages found, start with welcome message
        const welcomeMessage = {
          id: uuidv4(),
          type: "bot",
          content:
            "Hello! I'm your AI career assistant powered by Inngest and Gemini. Ask me anything about career planning, job searching, or professional development.",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        setMessages([welcomeMessage]);
        
        // Save welcome message to database
        saveMessage(welcomeMessage);
      }
    } catch (error) {
      console.error('Error loading chat messages:', error);
      // Fallback to welcome message
      setMessages([{
        id: uuidv4(),
        type: "bot",
        content:
          "Hello! I'm your AI career assistant powered by Inngest and Gemini. Ask me anything about career planning, job searching, or professional development.",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      }]);
    } finally {
      setIsLoading(false);
    }
  };
  const createChatSession = async () => {
    if (!user?.id || !chatId) return;

    try {
      await fetch('/api/chat-sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: chatId,
          title: 'New Chat',
        }),
      });
    } catch (error) {
      console.error('Error creating chat session:', error);
    }
  };

  const saveMessage = async (message) => {
    if (!user?.id || !chatId) return;

    try {
      await fetch('/api/chat-messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messageId: message.id,
          sessionId: chatId,
          userId: user.id,
          type: message.type,
          content: message.content,
        }),
      });
    } catch (error) {
      console.error('Error saving message:', error);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (user?.id) {
      loadChatHistory();
    }
  }, [user?.id]);

  useEffect(() => {
    if (chatId && user?.id) {
      setIsLoading(true);
      createChatSession();
      loadChatMessages(chatId);
    }
  }, [chatId, user?.id]);
  const handleSend = async (questionText = null) => {
    const messageText = questionText || inputValue.trim();
    if (!messageText) return;

    const userMessage = {
      id: uuidv4(),
      type: "user",
      content: messageText,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Save user message to database
    await saveMessage(userMessage);

    try {
      // Call the direct AI API for immediate response
      const response = await fetch("/api/ai-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: messageText,
          userId: user?.id || "anonymous",
          sessionId: chatId, // Use chatId from URL
        }),
      });

      const data = await response.json();

      if (data.success) {
        console.log("✅ AI response received from Gemini 2.5 Pro");

        const botMessage = {
          id: uuidv4(),
          type: "bot",
          content: data.response,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        setMessages((prev) => [...prev, botMessage]);
        
        // Save bot message to database
        await saveMessage(botMessage);
      } else {
        // Handle API errors
        const errorMessage = {
          id: uuidv4(),
          type: "bot",
          content: data.response || `🚨 Error: ${data.error}`,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        setMessages((prev) => [...prev, errorMessage]);
        
        // Save error message to database
        await saveMessage(errorMessage);
      }
      setIsTyping(false);
    } catch (error) {
      console.error("Failed to get AI response:", error);

      // Fallback response
      const fallbackMessage = {
        id: uuidv4(),
        type: "bot",
        content:
          "I am experiencing some technical difficulties connecting to my AI system. Please try again in a moment.",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, fallbackMessage]);
      
      // Save fallback message to database
      await saveMessage(fallbackMessage);
      setIsTyping(false);
    }
  };

  const handleQuestionClick = (question) => {
    handleSend(question);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Chat History Sidebar */}
      {showHistory && (
        <div className="w-80 bg-gray-50 border-r border-gray-200 overflow-y-auto">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-lg">Chat History</h3>
            <p className="text-sm text-gray-600">Your previous conversations</p>
          </div>
          <div className="p-4 space-y-2">
            {chatSessions.map((session) => (
              <button
                key={session.id}
                onClick={() => router.push(`/ai-tools/ai-chat/${session.id}`)}
                className={`w-full text-left p-3 rounded-lg border transition-all duration-200 ${
                  session.id === chatId
                    ? 'bg-black text-white border-black'
                    : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm'
                }`}
              >
                <div className="font-medium text-sm truncate">
                  {session.title}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {new Date(session.updated_at).toLocaleDateString()}
                </div>
              </button>
            ))}
            {chatSessions.length === 0 && (
              <p className="text-gray-500 text-sm text-center py-8">
                No chat history yet
              </p>
            )}
          </div>
        </div>
      )}

      {/* Chat Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-black text-white px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-black" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">AI Career QNA Chat</h2>
                <p className="text-sm text-gray-300">
                  Session: {chatId ? chatId.slice(0, 8) : 'Loading...'}...
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                onClick={() => setShowHistory(!showHistory)}
                className="bg-gray-700 text-white hover:bg-gray-600 font-medium"
              >
                <History className="w-4 h-4 mr-2" />
                History
              </Button>
              <Button 
                onClick={startNewChat}
                className="bg-white text-black hover:bg-gray-100 font-medium"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Chat
              </Button>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto mb-4"></div>
              <p className="text-gray-600">Loading chat...</p>
            </div>
          </div>
        ) : (
          <>            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex items-start space-x-3 max-w-2xl ${
                      message.type === "user"
                        ? "flex-row-reverse space-x-reverse"
                        : ""
                    }`}
                  >
                    {/* Avatar */}
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.type === "user"
                          ? "bg-black"
                          : "bg-gray-100 border-2 border-black"
                      }`}
                    >
                      {message.type === "user" ? (
                        <User className="w-5 h-5 text-white" />
                      ) : (
                        <Bot className="w-5 h-5 text-black" />
                      )}
                    </div>
                    {/* Message Bubble */}
                    <div
                      className={`px-4 py-3 rounded-2xl ${
                        message.type === "user"
                          ? "bg-black text-white rounded-br-sm"
                          : "bg-gray-50 text-black border border-gray-200 rounded-bl-sm"
                      }`}
                    >
                      {message.type === "bot" ? (
                        <div className="text-sm leading-relaxed space-y-4 font-medium">
                          {message.content.split('\n').map((line, index) => {
                            // Handle different formatting
                            if (line.trim() === '---') {
                              return <hr key={index} className="border-gray-300 my-4" />;
                            }
                            if (line.startsWith('🎯 ') || line.startsWith('💡 ') || line.startsWith('🚀 ')) {
                              return (
                                <h3 key={index} className="font-bold text-lg mt-5 mb-3 text-gray-800 tracking-tight">
                                  {line}
                                </h3>
                              );
                            }
                            if (line.startsWith('• ') || line.startsWith('- ')) {
                              return (
                                <div key={index} className="ml-6 mb-2 text-gray-700 leading-relaxed">
                                  {line}
                                </div>
                              );
                            }
                            if (line.match(/^\d+\. /)) {
                              return (
                                <div key={index} className="ml-6 mb-2 text-gray-700 leading-relaxed font-medium">
                                  {line}
                                </div>
                              );
                            }
                            if (line.trim() === '') {
                              return <div key={index} className="h-3"></div>;
                            }
                            // Regular paragraph text
                            return (
                              <p key={index} className="text-gray-700 leading-7 mb-2">
                                {line}
                              </p>
                            );
                          })}
                        </div>
                      ) : (
                        <p className="text-sm leading-relaxed font-medium">{message.content}</p>
                      )}
                      <p
                        className={`text-xs mt-2 ${
                          message.type === "user"
                            ? "text-gray-300"
                            : "text-gray-500"
                        }`}
                      >
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-3 max-w-2xl">
                    <div className="w-10 h-10 rounded-full bg-gray-100 border-2 border-black flex items-center justify-center flex-shrink-0">
                      <Bot className="w-5 h-5 text-black" />
                    </div>
                    <div className="bg-gray-50 border border-gray-200 rounded-2xl rounded-bl-sm px-4 py-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-black rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-black rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-black rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Recommended Questions */}
            {messages.length <= 1 && (
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  💡 Popular questions to get you started:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {recommendedQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuestionClick(question)}
                      className="text-left p-3 text-sm bg-white border border-gray-200 rounded-lg hover:border-black hover:shadow-sm transition-all duration-200 text-gray-700 hover:text-black"
                      disabled={isTyping}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="bg-white border-t border-gray-200 px-6 py-4">
              <div className="flex items-center space-x-3">
                <div className="flex-1">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about your career..."
                    className="border-2 border-gray-300 text-black focus:border-black focus:ring-0 rounded-lg py-3 px-4"
                    disabled={isTyping}
                  />
                </div>
                <Button
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-black hover:bg-gray-800 text-white rounded-lg px-6 py-3 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              {/* Helper Text */}
              <p className="text-xs text-gray-500 mt-2 text-center">
                Press Enter to send • Shift + Enter for new line
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex items-start space-x-3 max-w-2xl ${
                  message.type === "user"
                    ? "flex-row-reverse space-x-reverse"
                    : ""
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.type === "user"
                      ? "bg-black"
                      : "bg-gray-100 border-2 border-black"
                  }`}
                >
                  {message.type === "user" ? (
                    <User className="w-5 h-5 text-white" />
                  ) : (
                    <Bot className="w-5 h-5 text-black" />
                  )}
                </div>
                {/* Message Bubble */}
                <div
                  className={`px-4 py-3 rounded-2xl ${
                    message.type === "user"
                      ? "bg-black text-white rounded-br-sm"
                      : "bg-gray-50 text-black border border-gray-200 rounded-bl-sm"
                  }`}
                >
                  {message.type === "bot" ? (
                    <div className="text-sm leading-relaxed space-y-4 font-medium">
                      {message.content.split('\n').map((line, index) => {
                        // Handle different formatting
                        if (line.trim() === '---') {
                          return <hr key={index} className="border-gray-300 my-4" />;
                        }
                        if (line.startsWith('🎯 ') || line.startsWith('💡 ') || line.startsWith('🚀 ')) {
                          return (
                            <h3 key={index} className="font-bold text-lg mt-5 mb-3 text-gray-800 tracking-tight">
                              {line}
                            </h3>
                          );
                        }
                        if (line.startsWith('• ') || line.startsWith('- ')) {
                          return (
                            <div key={index} className="ml-6 mb-2 text-gray-700 leading-relaxed">
                              {line}
                            </div>
                          );
                        }
                        if (line.match(/^\d+\. /)) {
                          return (
                            <div key={index} className="ml-6 mb-2 text-gray-700 leading-relaxed font-medium">
                              {line}
                            </div>
                          );
                        }
                        if (line.trim() === '') {
                          return <div key={index} className="h-3"></div>;
                        }
                        // Regular paragraph text
                        return (
                          <p key={index} className="text-gray-700 leading-7 mb-2">
                            {line}
                          </p>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-sm leading-relaxed font-medium">{message.content}</p>
                  )}
                  <p
                    className={`text-xs mt-2 ${
                      message.type === "user"
                        ? "text-gray-300"
                        : "text-gray-500"
                    }`}
                  >
                    {message.timestamp}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-3 max-w-2xl">
                <div className="w-10 h-10 rounded-full bg-gray-100 border-2 border-black flex items-center justify-center flex-shrink-0">
                  <Bot className="w-5 h-5 text-black" />
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-2xl rounded-bl-sm px-4 py-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-black rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-black rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-black rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Recommended Questions */}
        {messages.length <= 1 && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              💡 Popular questions to get you started:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {recommendedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuestionClick(question)}
                  className="text-left p-3 text-sm bg-white border border-gray-200 rounded-lg hover:border-black hover:shadow-sm transition-all duration-200 text-gray-700 hover:text-black"
                  disabled={isTyping}
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="bg-white border-t border-gray-200 px-6 py-4">
          <div className="flex items-center space-x-3">
            <div className="flex-1">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about your career..."
                className="border-2 border-gray-300 text-black focus:border-black focus:ring-0 rounded-lg py-3 px-4"
                disabled={isTyping}
              />
            </div>
            <Button
              onClick={handleSend}
              disabled={!inputValue.trim() || isTyping}
              className="bg-black hover:bg-gray-800 text-white rounded-lg px-6 py-3 transition-colors"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          {/* Helper Text */}
          <p className="text-xs text-gray-500 mt-2 text-center">
            Press Enter to send • Shift + Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
};

export default AiChat;
