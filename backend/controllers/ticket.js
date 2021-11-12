const path = require('path');
const brain = require('brain.js');
const fs = require('fs');
const dataForge = require('data-forge');
require('data-forge-fs');

const jsonData = require('../json/OpenEdx_Board377.json');

const readJson = () => {
    // console.log(path.dirname(data) );
    // console.log(jsonData['377']);
    let tickets = []
    let issues_arr = [];
    for (const key in jsonData['377']) {
        if (Object.hasOwnProperty.call(jsonData['377'], key)) {
            const element = jsonData['377'][key];
            const details = element['details'];
            const issues = element['issues'];
            issues_arr.push(issues);
            if (details.goal !== '') {
                // console.log(details);
                // console.log(issues);
                const startDate = new Date(details.startDate);
                const endDate = new Date(details.endDate);
                const compDate = new Date(details.completeDate);
                const compOnTime = (compDate - startDate > endDate - startDate) ? 0 : 1;
                // console.log(startDate.toString());
                // console.log(endDate.toString());
                // console.log(compDate.toString());
                // console.log(compDate - startDate > endDate - startDate);
                // console.log(compDate - startDate);
                // console.log(endDate - startDate);
                // // console.log(totDate.toUTCString());
                // console.log('\n\n');

                tickets.push([details.id,details.self,details.name,details.goal,
                            details.state,details.startDate,details.endDate,
                            details.completeDate,issues.length,compOnTime])
            }
        }
    }
    const jsonString = JSON.stringify(issues_arr);
    // fs.writeFile('issues.json', jsonString);
    fs.writeFile('./issues.json', jsonString, err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file')
        }
    });

    // console.log(tickets);
    let df = new dataForge.DataFrame({
        columnNames: ['id','link','name','goal','state','start_date','end_date','completed_date','num_of_issues','on_time'],
        rows: tickets
    })
    // console.log(df.toArray());
    // let trainingData = []
    // df.toArray().forEach(element => {
    //     trainingData.push({input: element['num_of_issues'], output: element['on_time']})
    // });

    // create a simple recurrent neural network
    // const net = new brain.recurrent.RNN({hiddenLayers: [3]});

    // net.train(trainingData);
    // fs.writeFile('test.html', df.toHTML(), err => {
    //     if (err) {
    //       console.error(err)
    //       return
    //     }
    //     //file written successfully
    //   })
    // console.log(df.toHTML());
    // return [net.run(10),net.run(10),net.run(33)];
}

const predictStatus = (req,res) => {
    console.log('predict');
    const predictionModel = readJson();
    res.json({prediction: true, model: predictionModel});
}

module.exports = {
    predictStatus
}
