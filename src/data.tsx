
export const DEFAULT_CHALLENGE_DESCRIPTION = `Start with this design and transform it into a functional project using HTML, CSS, and JavaScript.

If you want to go the extra mile, expand upon it, and integrate your unique touch by adding animations and interactivity.

Prioritize creativity over pixel-perfect accuracy and showcase your developer ingenuity.`;


export const DEFAULT_CHALLENGE_DESCRIPTION_ALGORITHM = `Start with this problem statement and transform it into a functional algorithm using your choice of programming language. Implement the solution by designing an efficient data structure and optimizing the algorithm for performance.

If you want to go the extra mile, expand upon it by considering edge cases, improving the time and space complexity, and adding test cases to validate your solution.

Prioritize creativity and problem-solving skills over simply arriving at a correct answer. Showcase your developer ingenuity.`;


export const DEFAULT_CHALLENGE_CSS = ``;
export const DEFAULT_CHALLENGE_JS = ``;
export const DEFAULT_CHALLENGE_HTML = `<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Remove the line below if you don't want to use TailwindCSS -->
    <script src="https://cdn.tailwindcss.com"></script>

</head>

<!-- Change code below this line -->
<body class="bg-[#181028] flex justify-center items-center min-h-screen">
    <div class="bg-white text-[#181028] p-8 space-y-4 shadow-lg rounded-xl w-full max-w-xl">

        <p class="text-lg">Transform the design (bottom-right) <svg class="w-6 h-6 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M15 8h.01"></path><path d="M12 20h-5a3 3 0 0 1 -3 -3v-10a3 3 0 0 1 3 -3h10a3 3 0 0 1 3 3v5"></path><path d="M4 15l4 -4c.928 -.893 2.072 -.893 3 0l4 4"></path><path d="M14 14l1 -1c.617 -.593 1.328 -.793 2.009 -.598"></path><path d="M16 19h6"></path><path d="M19 16v6"></path></svg> into a functional project using HTML and CSS.</p>

        <h2 class="text-2xl">Want to go the extra mile?</h2>
        <p class="flex gap-2 font-medium text-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" stroke-width="3"
                stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M5 12l5 5l10 -10"></path>
            </svg>

            Add animations and make the project interactive using JavaScript! 😎
        </p>
        <p class="flex gap-2 font-medium text-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" stroke-width="3"
                stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M5 12l5 5l10 -10"></path>
            </svg>

            Prioritize creativity over pixel-perfect accuracy and showcase your developer ingenuity.
        </p>
        <p class="text-sm border-t pt-6">This example uses TailwindCSS by adding the CDN in the head tag. You can import any libraries you want using a CDN.</p>
    </div>
</body>
<!-- Change code above this line -->

</html>`;




export const DEFAULT_CHALLENGE_PYTHON = `# Don't change the function name & params
# Extract the params first and then calculate as you want

def question(*args):
    return args
`;
    
export const DEFAULT_CHALLENGE_CSHARP = `
// Don't change the function name & params
// Extract the params first and then calculate as you want

using System;
using System.Collections.Generic;

public class Program
{
    public static void Question(Dictionary<string, object> paramsDict)
    {
        // Extract parameters and perform calculations as needed
        Console.WriteLine(paramsDict);
    }

    public static void Main()
    {
        // Example usage
        var exampleParams = new Dictionary<string, object>
        {
            { "param1", 42 },
            { "param2", "Hello, world!" }
        };

        Question(exampleParams);
    }
}
`;

export const DEFAULT_CHALLENGE_JAVASCRIPT = `
// Don't change the function name & params
// Extract the params first and then calculate as you want

function question(...params) {
    return params;
}`;

export const DEFAULT_CHALLENGE_JAVA = `
// Don't change the function name & params
// Extract the params first and then calculate as you want

import java.util.Map;

public class Main {
    public static void question(Map<String, Object> params) {
        // Extract parameters and perform calculations as needed
        System.out.println(params);
    }
}`;


export const DEFAULT_TESTCASE = `[{ "params": [[1]], "result": 1 }]`