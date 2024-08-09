

import axios from 'axios';

export const LANGUAGE_VERSIONS = {
    javascript: "18.15.0",
    python: "3.10.0",
    java: "15.0.2",
    csharp: "6.12.0",
};

export const CODEPREVIEW_API = axios.create({
    baseURL: "https://emkc.org/api/v2/piston",
});


export const executeCode = async (language: string, sourceCode: string) => {
    const response = await CODEPREVIEW_API.post("/execute", {
        language: language,
        version: LANGUAGE_VERSIONS[language],
        files: [
            {
                content: sourceCode,
            },
        ],
    });
    return response.data;
};

export const getTestResult = async (code: string, testcases: string, lang: string) => {
    let function_str = code;

    if (lang == 'python') {
        function_str += `
import json
testcase_list = json.loads('${testcases}')

res = []
for testcase in testcase_list:
    func_result = question(*testcase['params'])
    test_result = 'PASS' if func_result == testcase['result'] else 'FAIL'
    res.append({
        params: testcase['params'],
        result: testcase['result'],
        funcResult: func_result,
        testResult: test_result
    })

json_string = json.dumps(res, indent=4)
print(json_string)
`;
    }
    else {
        function_str += `
const testcase_list = JSON.parse('${testcases}');

const res = [];
for(testcase of testcase_list){
    func_result = question(...testcase['params']);
    test_result = func_result == testcase['result'] ? 'PASS' : 'FAIL';
    res.push({
        params: testcase['params'],
        result: testcase['result'],
        funcResult: func_result,
        testResult: test_result
    });
}

json_string = JSON.stringify(res, null, 4);
console.log(json_string);
            `;
    }

    const resp = await executeCode(lang!, function_str);
    return resp.run.output;
}