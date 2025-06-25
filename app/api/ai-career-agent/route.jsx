export async function POST(req){
    const {userInput}=await req.json();


    const resultIds=await inngest.send({
        name:'PathfinderAI',
        data:{
            userInput: userInput
        }
    });

    const runId=resultIds.ids[0];

}
