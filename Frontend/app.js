// AI CHAT

async function askAI() {

    const question =
        document.getElementById("question").value;

    const answerBox =
        document.getElementById("answer");

    const loading =
        document.getElementById("loading");

    if(question.trim() === ""){
        alert("Please enter a question.");
        return;
    }

    loading.innerText = "🤖 Thinking...";
    answerBox.innerText = "";

    try{

        const response = await fetch(
           "https://ai-study-buddy-backend-ocsa.onrender.com/",
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    question
                })
            }
        );

        const data =
            await response.json();

        answerBox.innerText =
            data.answer;

    }
    catch(error){

        answerBox.innerText =
            "❌ Unable to connect to AI.";

    }

    loading.innerText = "";
}


// NOTES SUMMARIZER

async function summarizeNotes(){

    const notes =
        document.getElementById("notes").value;

    const resultBox =
        document.getElementById("summaryResult");

    if(notes.trim() === ""){
        alert("Please paste some notes.");
        return;
    }

    resultBox.innerText =
        "📝 Generating summary...";

    try{

        const response = await fetch(
            "http://localhost:5000/api/ask",
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    question:
                    "Summarize these notes in simple bullet points:\n\n" + notes
                })
            }
        );

        const data =
            await response.json();

        resultBox.innerText =
            data.answer;

    }
    catch(error){

        resultBox.innerText =
            "❌ Failed to generate summary.";

    }

}


// QUIZ GENERATOR

async function generateQuiz(){

    const topic =
        document.getElementById("quizTopic").value;

    const resultBox =
        document.getElementById("quizResult");

    if(topic.trim() === ""){
        alert("Please enter a topic.");
        return;
    }

    resultBox.innerText =
        "❓ Generating quiz...";

    try{

        const response = await fetch(
            "http://localhost:5000/api/ask",
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    question:
                    "Generate 5 MCQs with answers on " + topic
                })
            }
        );

        const data =
            await response.json();

        resultBox.innerText =
            data.answer;

    }
    catch(error){

        resultBox.innerText =
            "❌ Failed to generate quiz.";

    }

}


// STUDY PLANNER

async function createPlan(){

    const subject =
        document.getElementById("subject").value;

    const examDate =
        document.getElementById("examDate").value;

    const resultBox =
        document.getElementById("planResult");

    if(subject.trim() === ""){
        alert("Please enter a subject.");
        return;
    }

    resultBox.innerText =
        "📅 Creating study plan...";

    try{

        const response = await fetch(
            "http://localhost:5000/api/ask",
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    question:
                    `Create a study plan for ${subject}. Exam date: ${examDate}`
                })
            }
        );

        const data =
            await response.json();

        resultBox.innerText =
            data.answer;

    }
    catch(error){

        resultBox.innerText =
            "❌ Failed to create study plan.";

    }

}