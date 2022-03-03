/**
* PT-BR:
*  Autor: Paulo Citron
*  Este script é responsável por buscar os screenshots, adiciona-los ao report e gerar o report HTML.
*  O report HTML é gerado a partir do report 
JSON gerado pelo cypress-cucumber-preprocessor - docs: https://github.com/TheBrainFamily/cypress-cucumber-preprocessor
*  Os reports estão sendo gerados pelo 
multiple-cucumber-html-processor - docs: http://cypress.io/guides/references/plugins/multiple-cucumber-html-processor.html
*  Para executar este script você pode utilizar o comando 'npm run cy:report' ou 'node ./cypress/support/reporter.js'
*
* EN:
* Author: Paulo Citron
* This script is responsible for finding the screenshots, adds them to the report and generate the report HTML.
* The report HTML is generated from the 
JSON report generated by the cypress-cucumber-preprocessor in 
the file 'report/cucumber-json' - docs: https://github.com/TheBrainFamily/cypress-cucumber-preprocessor
* The reports are being generated by 
the multiple-cucumber-html-processor - docs: http://cypress.io/guides/references/plugins/multiple-cucumber-html-processor.html
* To execute this script you can use the command 'npm run cy:report' or 'node ./cypress/support/reporter.js'
*/

const report = require('multiple-cucumber-html-reporter');
const fs = require('fs');
const path = require('path');
const pathreports = 'reports';
const cucumberJsonDir = `${pathreports}/json`;
const screenshotsDir = `${pathreports}/screenshots/spec/`; 
if(!fs.existsSync(screenshotsDir)){
    fs.mkdirSync(screenshotsDir, {
        recursive: true
    });
}
const jsonPath = path.join(__dirname, '../../../', cucumberJsonDir);
const screenshotsPath = path.join(__dirname, '../../../', screenshotsDir);
const files = fs.readdirSync(jsonPath);
const jsonNames = {};
const cukeMap = {};
const featureToFileMap = {};

files.forEach(file => {
    const json = JSON.parse(
        fs.readFileSync(path.join(jsonPath, file)).toString()
    );
    const feature = json[0].uri.split('/').reverse()[0];
    jsonNames[feature] = file;
    cukeMap[feature] = json;
    featureToFileMap[feature] = file;
});


const failingFeatures = fs.readdirSync(path.join(screenshotsPath));
failingFeatures.forEach(feature => {
    const screenshots = fs.readdirSync(path.join(screenshotsPath, feature));
    screenshots.forEach(screenshot => {
        const scenarioName = screenshot.split('--')[1].split('(failed)')[0].trim();
        const myScenario = cukeMap[feature][0].elements.find(
            e => e.name === scenarioName
        );
        const myStep = myScenario.steps.find(
            step => step.result.status !== 'passed'
        );
        const data = fs.readFileSync(
            path.join(screenshotsPath, feature, screenshot)
        );
        if (data) {
            const base64Image = Buffer.from(data, 'binary').toString('base64');
            myStep.embeddings = [];
            myStep.embeddings.push({
                data: base64Image,
                mime_type: 'image/png'
            });
        }
        fs.writeFileSync(
            path.join(jsonPath, jsonNames[feature]),
            JSON.stringify(cukeMap[feature], null, 2)
        );
    });
});

report.generate({
    jsonDir: 'reports/json',
    reportPath: 'reports/html',
    pageFooter: '<div></div>',
    openReportInBrowser: false,
    displayDuration: true,
    displayReportTime: true,
    hideMetadata: true,
    /**
     *customData: {
        title: 'Run info',
        data: [
            {label: 'Project', value: 'Custom project'},
            {label: 'Release', value: '1.2.3'},
            {label: 'Cycle', value: 'B11221.34321'},
            {label: 'Execution Start Time', value: 'Nov 19th 2017, 02:31 PM EST'},
            {label: 'Execution End Time', value: 'Nov 19th 2017, 02:56 PM EST'}
        ]
      }
    */
});
