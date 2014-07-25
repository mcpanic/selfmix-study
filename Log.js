"use strict";

// Adding user interaction event logs
var Log = function ($, window, document) {

    // pid: participant ID. serves as a unique session ID.
    // tid: task ID. serves as a unique task ID. N tasks in a session.
    // torder: task order in a session. starts from 1 and increments for each session.
    // ttype: task type. "vs": visual search, "ps": problem search, "sk": skimming
    // iid: interface ID. "con": control interface, "exp": experimental interface
    var conditions = {
        // "1": {
        //     "pid": 1,
        //     "tid": 1,
        //     "torder": 1,
        //     "ttype": "vs",
        //     "iid": "con"
        // },
        // "2": {
        //     "pid": 1,
        //     "tid": 2,
        //     "torder": 2,
        //     "ttype": "vs",
        //     "iid": "exp"
        // }
    };

    var part1QuestionnaireUrlNo = "https://docs.google.com/forms/d/1y3vxiK9c44SitSyT6_TC2-r-GeGqDCY-YusLohg63Rs/viewform";
    var part2QuestionnaireUrlNoA = "https://docs.google.com/forms/d/10_Byf7YXTIFaDKuT4a4HhIhTIkiaYsWUnn7GMaqippw/viewform";
    var part2QuestionnaireUrlNoB = "https://docs.google.com/forms/d/1_Ia_QxvGylUo-MJEChUaduo3knJP3U3DqpUNVcG0a9w/viewform";
    var part3QuestionnaireUrlNo = "https://docs.google.com/forms/d/1HiRMfobNntke0xB_sdgA1vdlIcDOEcZmBxgO7fj5HsY/viewform";


    var part1QuestionnaireUrlYes = "https://docs.google.com/forms/d/1M5QXlQBa1lHngAyuStpqDMxbnEQ88V1kY8MZ_svjS60/viewform";
    var part2QuestionnaireUrlYesA = "https://docs.google.com/forms/d/1_YzbVPyBCiD8rhjG1mseh5I1R43SPO6aPN4uLuVrE44/viewform";
    var part2QuestionnaireUrlYesB = "https://docs.google.com/forms/d/1O7VqxEKQ5QfjaDAqx9XRY0kk0SrgKfpmLhcTRGApNrk/viewform";
    var part3QuestionnaireUrlYes = "https://docs.google.com/forms/d/1_d7MMurHiH84ePy3Ot0dsZiqGh_dXjAp5e2sHvZkmOU/viewform";


    var post1QuestionnaireUrl = "https://docs.google.com/forms/d/15xbuacqp3fFZukpqquObm7al8UzyKuRvlNbsBnj-Ots/viewform";
    var post2QuestionnaireUrl = "https://docs.google.com/forms/d/12aDI2Z2PqXJKR6omCUhnyt5aRSvMeaI8HAXSUBDh3lo/viewform";
    //"http://localhost:5555/app/player/6.00x/aTuYZqhEvuk/?iid=con&tid=0&torder=0&ttype=tutorial";
    //var tutorialExpUrl = "http://localhost:5555/app/player/6.00x/aTuYZqhEvuk/?iid=exp&tid=0&torder=0&ttype=tutorial";
    var tutorialCon = {
                    "tid": 0,
                    "torder": 0,
                    "ttype": "tu",
                    "iid": "con",
                    "vcode": "A",
                    "vid": "aTuYZqhEvuk"
    }
    var tutorialExp = {
                    "tid": 0,
                    "torder": 0,
                    "ttype": "tu",
                    "iid": "exp",
                    "vcode": "A",
                    "vid": "aTuYZqhEvuk"
    }

    var numParticipants = 12;
    var numTasks = 6;
    var tseq = ["vs", "vs", "re", "re", "sk", "sk"];
    var itype1 = ["con", "exp", "con", "exp", "con", "exp"];
    var itype2 = ["exp", "con", "exp", "con", "exp", "con"];
    var mapping1 = ["A", "B", "A", "B", "A", "B"];
    var mapping2 = ["B", "A", "B", "A", "B", "A"];
    // video IDs to use for tasks.
    var tasks = {
        "vs": {"A": "simple_examples/p1.html", "B": "simple_examples/p2.html"},
        "re": {"A": "discussion_example/discussion.html", "B": "discussion_example/discussion2.html"},
        "sk": {"A": "medium_example/medium.html", "B": "medium_example/medium2.html"}
    };

    function createTasks() {
        var i, j, itype, vtype, taskOrder;
        var taskCount = 0;
        for (i = 1; i <= numParticipants; i++) {
            // console.log("Participant", i);
            if (i % 2 == 1)
                itype = itype1;
            else
                itype = itype2;
            if (i % 4 == 1 || i % 4 == 2)
                vtype = mapping1;
            else
                vtype = mapping2;
            for (j = 0; j < numTasks; j++) {
                taskCount += 1;
                // taskOrder = taskCount % tseq.length;
                Log.conditions[taskCount] = {
                    "pid": i,
                    "tid": taskCount,
                    "torder": j + 1,
                    "ttype": tseq[j],
                    "iid": itype[j],
                    "vcode": vtype[j],
                    "vid": Log.tasks[tseq[j]][vtype[j]]
                }
            }
        }
        console.log(taskCount, "tasks created");
        // console.log(Log.conditions);
        for (var cond in Log.conditions) {
            console.log("pid:", Log.conditions[cond].pid, "tid:", Log.conditions[cond].tid, "torder:", Log.conditions[cond].torder, "ttype:", Log.conditions[cond].ttype, "iid:", Log.conditions[cond].iid, "vcode", Log.conditions[cond].vcode, "vid:", Log.conditions[cond].vid);
        }
    }

/*
    function add(module, action, message) {
        var pid = typeof params !== "undefined" && params["pid"] !== null ? params["pid"] : "test";
        var tid = typeof params !== "undefined" && params["tid"] !== null ? params["tid"] : 0;
        var newParams = typeof params === "undefined" ? {} : params;
        var vewVideoID = typeof video_id === "undefined" ? "" : video_id;
        $.ajax({
            type: "POST",
            url: "/app/log-ajax/",
            data: {
                csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value,
                pid: pid,
                tid: tid,
                module: module,
                action: action,
                message: JSON.stringify(message),
                params: JSON.stringify(newParams),
                video: vewVideoID
            },
        }).done(function(data){
            // console.log("add-log done");
        }).fail(function(){
            console.log("add-log failed");
        }).always(function(){
        });
    }
*/
    return {
        conditions: conditions,
        tutorialCon: tutorialCon,
        tutorialExp: tutorialExp,
        part1QuestionnaireUrlNo: part1QuestionnaireUrlNo,
        part2QuestionnaireUrlNoA: part2QuestionnaireUrlNoA,
        part2QuestionnaireUrlNoB: part2QuestionnaireUrlNoB,
        part3QuestionnaireUrlNo: part3QuestionnaireUrlNo,
        part1QuestionnaireUrlYes: part1QuestionnaireUrlYes,
        part2QuestionnaireUrlYesA: part2QuestionnaireUrlYesA,
        part2QuestionnaireUrlYesB: part2QuestionnaireUrlYesB,
        part3QuestionnaireUrlYes: part3QuestionnaireUrlYes,
        post1QuestionnaireUrl: post1QuestionnaireUrl,
        post2QuestionnaireUrl: post2QuestionnaireUrl,
        tasks: tasks,
        createTasks: createTasks,
        // add: add
    };
}(jQuery, window, document);