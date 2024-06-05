import { createSlice } from "@reduxjs/toolkit";
import {
  getPastQuestions,
  getQuestionAnalysis,
  getTestAnalysisDetails,
  getTestData,
  sendTestData,
  getFlaggedQuestionAnalysis, toggleQuestionFlag, fetchCountries
} from "../actions/examActions";
import moment from "moment/moment";
import {SUBMIT_ERROR} from "../../api/urls";



const initialExamState = {
  examsdata: {types:[],filters:{
      subjectFilter:"",typeFilter:"",yearFilter:""
    },states:{},selectedStates:[]},
  adminsdata: {types:[],years:[],subjects:[],filters:{
      subjectFilter:"",typeFilter:"",yearFilter:""
    }},
  analysisdata: {questionFlags: {},isRefresh:0},
  testdata: {doneLoading:false,isOldValue:false,isDoneReview:false,
    isDoneReviewIndex:-1,isDoneFinalReview:false,
    timefinished:false,doneLoadingReset:false},
  stateClass : {
        0: 'not_attended',
        1: 'viewed',
        2: 'attended',
        3: 'selected',
      },
  stateData: {
    not_attended: 0,
    viewed: 1,
    attended: 2,
    selected: 3,
  },
  examTypes:{
    subjective: 3,
    textBox: 1,
    media: 2,
    comprehension: 4,
    singleAnswer: 1,
    multipleAnswer: 2,
  },
  summary: {},
  meta: {},
  questions: [],
  questionAnswers: [],
  questionAnswersAll: {},
  reviewQuestions: {},
  finalQuestions: {}
};

const updateQuestions = (state, action) => {
  state.countA += 1;
};


const setDefaultQuestion = (id,oldQuestionAnswer) => {
 return {
   answer: oldQuestionAnswer.answer || undefined,
   state: oldQuestionAnswer.state || initialExamState.stateData.not_attended,
   time: oldQuestionAnswer.time || 0,
   start_time: oldQuestionAnswer.start_time || 0,
   end_time: oldQuestionAnswer.end_time || 0,
   index: oldQuestionAnswer.index || 0,
   id,
 }
}

const prepareQuestionAnalysis = (state, action) => {


  let newQuestionData = {};
  let newQuestionDatas = [];
  let index = 0;
  for(const que in state.analysisdata.questions) {
    const question = state.analysisdata.questions[que];
    newQuestionDatas.push(question);
  }

  return newQuestionDatas;
};

const getCurrentState = (questionAnswer) => {
  let state = initialExamState.stateData.viewed;
  if(questionAnswer.option_type_id === initialExamState.examTypes.singleAnswer){
    if (isDefined(questionAnswer.answer)) {
      state = initialExamState.stateData.attended;
    }
  }
  else if(questionAnswer.option_type_id === initialExamState.examTypes.multipleAnswer){
    if (isDefined(questionAnswer.answer) &&
        Object.keys(questionAnswer.answer).length) {
      state = initialExamState.stateData.attended;
    }
  }
  else if(questionAnswer.option_type_id === initialExamState.examTypes.subjective){
    if(questionAnswer.option_answer_type_id === initialExamState.examTypes.textBox) {
      if (isDefined(questionAnswer.answer)) {
        state = initialExamState.stateData.attended;
      }
    }
    else if (questionAnswer.option_answer_type_id === initialExamState.examTypes.media) {
      if (isDefined(questionAnswer.answer) &&
          Object.keys(questionAnswer.answer).length) {
        state = initialExamState.stateData.attended;
      }
    }
  }
  else if (questionAnswer.option_type_id === initialExamState.examTypes.comprehension) {
    var is_all_answer = true;
    Object.keys(questionAnswer.answers).forEach((subQuesId) => {
      var is_answer =  isDefined(questionAnswer['answers'][subQuesId].answer);
      if(!is_answer)
        is_all_answer = false;
    })
    if(is_all_answer) {
      state = initialExamState.stateData.attended;
    }
  }

    return state;
}
const isDefined = (answer) => {
  return (typeof answer !== undefined) && (typeof answer !== 'undefined');
}
const prepareQuestions = (state, action) => {
  let questionsBack = JSON.parse(localStorage.getItem(`questions-${action.payload.meta.uniqueId}`));
  let is_old_data = false;

  if (questionsBack && questionsBack.questions &&
      questionsBack.questions.length) {
    is_old_data = true;
    questionsBack.questions = questionsBack.questions
        .reduce((accu, curr, i) => {
          if(!curr)return  accu;
          accu[curr.id] = curr
          return accu
        }, {});
  }

  let newQuestionData = {};
  let newQuestionDatas = [];
  let index = 0;
  for (const questionKey in action.payload.questions) {
    const question = action.payload.questions[questionKey];
    const oldQuestionAnswer = (is_old_data && questionsBack.questions[question.id]) ?? {};
    newQuestionData = setDefaultQuestion(question.id, oldQuestionAnswer);
    newQuestionData['option_type_id'] = question.option_type_id;
    if (question.option_type_id === initialExamState.examTypes.singleAnswer) {
      newQuestionData['index'] = index;
    }
    if (question.option_type_id === initialExamState.examTypes.multipleAnswer) {
      newQuestionData['answer'] = oldQuestionAnswer.answer || {};
      newQuestionData['index'] = index;
    } else if (question.option_type_id === initialExamState.examTypes.subjective) {
      if (question.option_answer_type_id === initialExamState.examTypes.media) {
        newQuestionData['answer'] = oldQuestionAnswer.answer || {};
        newQuestionData['index'] = index;
        newQuestionData['option_answer_type_id'] = question.option_answer_type_id;
      }
    } else if (question.option_type_id === initialExamState.examTypes.comprehension) {
      newQuestionData['index'] = index;
      newQuestionData['answers'] = oldQuestionAnswer.answers || {};
      if (!oldQuestionAnswer) {
        question.sub_questions.forEach(function (que) {
          if (!newQuestionData['answers'][`${que.id}`]) newQuestionData['answers'][`${que.id}`] = {}
          newQuestionData['answers'][`${que.id}`]['answer'] = undefined;
          newQuestionData['answers'][`${que.id}`]['option_type_id'] = que.option_type_id;
        })
      }
    }
    if (is_old_data) {
      if (index === questionsBack.current_index) {
        newQuestionData['state'] = initialExamState.stateData.selected;
      } else if (newQuestionData['state'] === initialExamState.stateData.selected) {
        newQuestionData['state'] = getCurrentState(oldQuestionAnswer);
        // console.log(newQuestionData.state);
      }
        // newQuestionData['state'] = initialExamState.stateData.viewed;
        // console.log("i am the string state",newQuestionData.state);
    }
    index++;
    newQuestionDatas.push(newQuestionData);
  }
  if (is_old_data) {
    state.testdata.currentIndex = questionsBack.current_index;
    state.testdata.previousIndex = questionsBack.current_index-1;
    state.testdata.isOldValue = true;
    // console.log("state.testdata.previousIndex",
    //     JSON.stringify(state.testdata.previousIndex),JSON.stringify(questionsBack));
  } else {
    state.testdata.currentIndex = -1;
  }
  // console.log(`From Question Backup After: ${action.payload.meta.uniqueId} ${JSON.stringify([...newQuestionDatas])}`);

  return newQuestionDatas;
};

const  updateAnswered = (state, action) => {
  const {detail, flag, index } = action.payload;
  const questionAnswer = {...state.questionAnswers[index]};
  if(flag === 4){
    questionAnswer.flagged = !questionAnswer.flagged;
    questionAnswer.reason = detail.reason;
  }
  else{
    if(questionAnswer.option_type_id === initialExamState.examTypes.singleAnswer){
      updateAnswerSwitch(questionAnswer.option_type_id,questionAnswer,detail,flag)
    }
    else if(questionAnswer.option_type_id === initialExamState.examTypes.multipleAnswer){
      updateAnswerSwitch(questionAnswer.option_type_id,questionAnswer,detail,flag)
    }
    else if(questionAnswer.option_type_id === initialExamState.examTypes.subjective){
      if(questionAnswer.option_answer_type_id === initialExamState.examTypes.textBox) {
        updateAnswerSwitch(questionAnswer.option_answer_type_id, questionAnswer, detail,flag);
      }
      else if(questionAnswer.option_answer_type_id === initialExamState.examTypes.media){
        updateAnswerSwitch(questionAnswer.option_answer_type_id, questionAnswer, detail,flag);
      }
    }
    else if(questionAnswer.option_type_id === initialExamState.examTypes.comprehension){
      // console.log(questionAnswer.answers[`${detail.comp_id}`].option_type_id);
      if(flag === 1) {
        updateAnswerSwitch(questionAnswer.answers[`${detail.comp_id}`].option_type_id,
            questionAnswer.answers[`${detail.comp_id}`]
            , detail,flag)
      }
      else{
        updateAnswerSwitch(questionAnswer.option_type_id,
            questionAnswer.answers
            , detail,flag)
      }
    }
  }
        // console.log(action.payload,questionAnswer);
  state.questionAnswers[index] = questionAnswer;
  // console.log("updateAnswered object questionAnswer",{...state.questionAnswers},index);

}

const  updateAnswerSwitch = (option_type_id,questionAnswer,detail,flag) => {
  if(option_type_id === initialExamState.examTypes.singleAnswer){
    questionAnswer.answer = flag === 1?+detail.answer:undefined;
  }
  else if(option_type_id === initialExamState.examTypes.multipleAnswer){
    if(flag === 2){
      questionAnswer.answer = {};
      return;
    }
    if(typeof questionAnswer.answer !== 'object')
      questionAnswer.answer = {};
    if(questionAnswer.answer[detail.answer])delete  questionAnswer.answer[detail.answer];
    else  questionAnswer.answer[detail.answer] = +detail.answer;
    // console.log("updateAnswered object comp flag 2"
    //     ,{...questionAnswer.answer},detail.answer);
  }
  else if(option_type_id === initialExamState.examTypes.comprehension && flag === 2){
    Object.keys(questionAnswer).forEach((key) => {
      questionAnswer[key]['answer'] = undefined;
    })
    // console.log("updateAnswered object comp flag 2"
    //     ,{...questionAnswer.answer},detail.answer);
// if (object.hasOwnProperty(key))
  }
}

const saveAnsweredHelper = (state, action,payload) => {
  state.questionAnswersAll = payload;
  localStorage.setItem(`questions-${state.meta.uniqueId}`, JSON.stringify(payload));
  // console.log("Saving Questions",JSON.stringify({...payload}));

}
const saveQuestionAnswerState = (state, action,detail,index) => {
  if (state.questionAnswers && state.questionAnswers[index]) {
    for (const key in detail) {
      let value = detail[key];
      if (key === 'time') {
        value += state.questionAnswers[index][key];
        // console.log("Final end time value",value);
      }
      state.questionAnswers[index][key] = value;
      // console.log(`About to set previous state in slice ${key} ${action.payload.index} ${value}
      // ${JSON.stringify({...state.questionAnswers[action.payload.index]})}`)
    }
  }
}
const prepareReviewQuestions = (state, action) => {

    const questionAnswers = state.questionAnswers
        .reduce((accu, curr, i) => {
          accu[curr.id] = curr
          return accu
        }, {});

  const questionAttended = [];
  const  questionNotAttended = [];

  for(const questionKey in state.questions){
    const question = state.questions[questionKey];
    if(questionAnswers[question.id].state === initialExamState.stateData.attended){
      questionAttended.push(questionKey);
    }
    else{
      questionNotAttended.push(questionKey);
    }
  }
  state.reviewQuestions = {
    questionNotAttended:questionNotAttended,
    questionAttended:questionAttended,
  }
  state.testdata.isDoneReview = true;
  // return newQuestionDatas;
};

const prepareSubmitQuestions = (state, action) => {
  const uniqueId = state.meta.uniqueId || action.payload.uniqueId;
  const finalquestions = [];
  let questionAttended = 0;
  let  questionNotAttended = 0;
  let newSubmitItem;
  let questionAnswers = JSON.parse(localStorage.getItem(`questions-${uniqueId}`));
  if(!questionAnswers || !questionAnswers.questions.length){
    return;
  }
  questionAnswers = questionAnswers.questions;
  // console.log(`Test: ${uniqueId} ${JSON.stringify({...questionAnswers})}`);
  for(const questionKey in questionAnswers){
    const questionAnswer = questionAnswers[questionKey];
    newSubmitItem = {
      id: questionAnswer.id,
      time: questionAnswer.time,
      state: questionAnswer.state,
      flagged: questionAnswer.flagged,
      reason: questionAnswer.reason,
      answers: getAnswers(questionAnswer),
    }
    if(questionAnswer.state === initialExamState.stateData.attended ||
        questionAnswer.state === initialExamState.stateData.selected){
      questionAttended++;
    }
    else{
      questionNotAttended++;
      // console.log(`UnAnswered: ${uniqueId} ${JSON.stringify({...questionAnswer})}`);

    }
    finalquestions.push(newSubmitItem);
  }
  state.finalQuestions = {
    questionNotAttended:questionNotAttended,
    questionAttended:questionAttended,
    questions:finalquestions,
    uniqueId:state.meta.uniqueId,
    question_length: finalquestions.length
  }
  // console.log("Not on start Saving Questions",JSON.stringify({...state.finalQuestions}));

  if(!action.payload.forceExit) {
    state.testdata.isDoneFinalReview = true;
  }
  else{
    // console.log("Not on start Saving Questions",
    //     JSON.stringify({...state.finalQuestions}),
    //     action.payload);
  }
};

const getAnswers = (questionAnswer) => {
  let answers = {};
  if(questionAnswer.option_type_id === initialExamState.examTypes.singleAnswer){
    if (typeof questionAnswer.answer !== undefined) {
      answers = questionAnswer.answer;
    }
  }
  else if(questionAnswer.option_type_id === initialExamState.examTypes.multipleAnswer){
    if (typeof questionAnswer.answer !== undefined &&
        Object.keys(questionAnswer.answer).length) {
      Object.keys(questionAnswer.answer).forEach((key,curIndex) => {
          if(questionAnswer.answer[key]){
            answers[key] = true;
          }
      });
    }
  }
  else if(questionAnswer.option_type_id === initialExamState.examTypes.subjective){
    if(questionAnswer.option_answer_type_id === initialExamState.examTypes.textBox) {
      if (typeof questionAnswer.answer !== undefined) {
        answers = questionAnswer.answer;
      }
    }
    else if (questionAnswer.option_answer_type_id === initialExamState.examTypes.media) {
      if (typeof questionAnswer.answer !== undefined &&
          Object.keys(questionAnswer.answer).length) {
        answers = Object.keys(questionAnswer.answer) .reduce((accu, curr, i) => {
          accu.push(curr.id);
          return accu
        }, []);
      }
    }
  }
  else if (questionAnswer.option_type_id === initialExamState.examTypes.comprehension) {
    Object.keys(questionAnswer.answers).forEach((subQuesId) => {
      if(questionAnswer['answers'][subQuesId].answer !== undefined){
        answers[subQuesId]  = questionAnswer['answers'][subQuesId].answer;
      }
    })
  }
  return answers;
}

const cleanupSubmit = (state,flag) => {
  if(!flag) {
    localStorage.removeItem(`submit-${state.meta.uniqueId}`);
    localStorage.removeItem(`questions-${state.meta.uniqueId}`);
    // localStorage.setItem(`done-${state.meta.uniqueId}`, JSON.stringify(state.testdata.resultData));
    localStorage.removeItem(`questions-${state.meta.uniqueId}`);
    localStorage.removeItem(`meta-${state.meta.uniqueId}`);
  }
  restoreDefault(state);
  // console.log("Cleaning Up the test");
}

const restoreDefault = (state) => {
  state.meta = {};
  // state.examsdata = {};
  state.summary = {};
  state.questionAnswers = [];
  state.questionAnswersAll = {};
  state.reviewQuestions = {};
  state.finalQuestions = {};
  state.questions = {};
  state.testdata.doneLoading = false;
  state.testdata.doneLoadingReset = false;
  state.testdata.isOldValue = false;
  state.testdata.isDoneReview = false;
  state.testdata.isDoneReviewIndex = -1;
  state.testdata.isDoneFinalReview = false;
  state.testdata.timeStoppedDuration = false;
  state.testdata.timefinished = false;
  state.testdata.startSending = false;
  state.testdata.sendingDoneLoading = false;
  state.testdata.sendingError = false;
  state.testdata.error = false;
  // console.log("exit cleanUp");
}

const prepareTestForSubmitting = (state,action) => {
  // console.log("Called from duration elas error Submit: ",state.meta.uniqueId);
  prepareSubmitQuestions(state, action);
  if(state.finalQuestions && state.finalQuestions.question_length){
    setFinalQuestionParameters(state,action,-1);
    state.testdata.timeStoppedDuration = true;
  }
  else{
    state.testdata.doneLoadingReset = true;
  }
  // console.log(`i am called to prepare: ${JSON.stringify({...state.finalQuestions})}`);
}


const inArray = (needle, haystack) => {
    var length = haystack.length;
    for(let i = 0; i < length; i++) {
      if(haystack[i] === needle) return true;
    }
    return false;
}

const timeToMilliseconds = (time) => {
  let milliseconds = 0;
  milliseconds += time.seconds * 1;
  milliseconds += time.minutes * 60;
  milliseconds += (time.hours ? time.hours : 0) * 3600;
  // console.log("formatting Timer",milliseconds);
  return milliseconds;
}

const setFinalQuestionParameters = (state,action,finalDuration) => {
  // console.log("Value when calling Submit: ",state.meta.uniqueId);
  state.finalQuestions.end_date = moment().format("YYYY-MM-DD HH:mm");
  state.finalQuestions.duration = timeToMilliseconds(finalDuration);
  state.testdata.question_length = state.finalQuestions.question_length > 0 || false ;
  localStorage.setItem(`submit-${state.meta.uniqueId}`, JSON.stringify({...state.finalQuestions}));
  state.testdata.timeStoppedDuration = true;
}



const examSlice = createSlice({
  name: "exam",
  initialState: initialExamState,
  reducers: {
    setExamDetail(state, action) {
      for (const key in action.payload) {
        state.summary[key] = action.payload[key];
      }
    },
    setExamMeta(state, action) {
      for (const key in action.payload) {
        state.meta[key] = action.payload[key];
      }
      // console.log("slice meta: ",action.payload);
    },
    setExamQuestions(state, action){
      for (const key in action.payload) {
        state.questions[key] = action.payload[key];
      }
      // console.log("slice questions: ",action.payload);
    },
    resetExamQuestions(state, action) {
      state.questions = action.payload;
      state.summary = {};
    },
    updateCurrentAnswer(state, action) {
      if(action.payload.flag !== 0){
        updateAnswered(state,action);
        return;
      }
      saveQuestionAnswerState(state,action,action.payload.detail
          ,action.payload.index);
      // console.log("i was called Here: ",action.payload);

    },
    saveAnswered(state, action) {
      saveAnsweredHelper(state, action,action.payload);
    },
    prepareReview(state, action) {
      if(action.payload.flag === 2){
        state.testdata.isDoneReviewIndex =
            +action.payload.index;
        return;
      }
      if(action.payload.flag === 3){
        state.testdata.isDoneReview = false;
        state.testdata.isDoneReviewIndex =
            -1;
        return;
      }
      prepareReviewQuestions(state,action);
      // console.log({...state.testdata});
    },
    prepareSubmit(state, action) {
      if(action.payload.flag === 2){
        state.testdata.isDoneFinalReview = false;
        return;
      }
      saveQuestionAnswerState(state,action,action.payload.detail
          ,action.payload.index);
      const currentStateDetails = {
        'current_index': action.payload.index,
        'questions': state.questionAnswers,
        'previous_index': action.payload.previous_index}
      saveAnsweredHelper(state, action,currentStateDetails);
      prepareSubmitQuestions(state, action);
      // console.log("Prepare Submit");
    },
    updateExamError(state, action) {
      state.testdata.error = action.payload;
      // console.log("Submit Error");
    },
    setDurationFormatted(state, action) {
      // console.log("Called from duration end Submit: ",state.meta.uniqueId);
      setFinalQuestionParameters(state,action,action.payload);
      // console.log("Submit Error",state.meta);
    },
    setTimeFinished(state, action) {
      state.testdata.timefinished = true;
    },
    exitCleanUp(state, action) {
      cleanupSubmit(state,true);
    },
    sendToNetwork(state, action) {
      state.finalQuestions =  JSON.parse(localStorage.getItem(`submit-${action.payload}`));
      if(state.finalQuestions && state.finalQuestions.question_length) {
        state.testdata.startSending = true;
      }
      else{
        state.testdata.sendingError = "Nothing to submit";
        state.testdata.sendingDoneLoading = true;
      }
      // console.log("Submit to network",{...state.finalQuestions},
      //     action.payload,state.meta);
    },
    setGlobalFilter(state, action) {
      localStorage.setItem(`filters`, JSON.stringify({...action.payload}));
    },
    setFlaggedArray(state, action) {
        state.analysisdata.questionFlags[action.payload.questionId] =
            {flagged: action.payload.flagged};
    },
    refreshFlaggedTable(state, action) {
      state.analysisdata.isRefresh = action.payload;
      // console.log("Setting isRefresh: ",
      //     state.analysisdata.isRefresh);
    },
    selectState(state, action) {
      if(state.examsdata.states[action.payload.countryId]){
        state.examsdata.selectedStates =
            state.examsdata.states[action.payload.countryId];
      }
      else{
        state.examsdata.selectedStates = [];
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPastQuestions.pending, (state) => {
      state.examsdata.loading = true;
    });
    builder.addCase(getPastQuestions.rejected, (state,action) => {
      state.examsdata.error = action.payload;
    });
    builder.addCase(getPastQuestions.fulfilled, (state, action) => {
      state.examsdata.pastQuestions = action.payload.payload;
      state.examsdata.questionsMeta = action.payload.meta;
      if(action.payload.is_filter){
        state.examsdata.types = action.payload.types;
        state.examsdata.subjects = action.payload.subjects;
        state.examsdata.years = action.payload.years;
      }
      state.examsdata.loading = false;
    });

    builder.addCase(getQuestionAnalysis.pending, (state) => {
      state.analysisdata.loading = true;
    });
    builder.addCase(getQuestionAnalysis.rejected, (state,action) => {
      state.analysisdata.error = action.payload;
    });
    builder.addCase(getQuestionAnalysis.fulfilled, (state, action) => {
      state.analysisdata.pastQuestions = action.payload.payload;
      state.analysisdata.questionsMeta = action.payload.meta;
      if(!state.analysisdata.pastQuestions)
        state.analysisdata.pastQuestions = [];
      if(action.payload.is_filter){
        state.adminsdata.types = action.payload.types;
        state.adminsdata.subjects = action.payload.subjects;
        state.adminsdata.years = action.payload.years;
      }
      state.analysisdata.loading = false;
    });

    builder.addCase(getFlaggedQuestionAnalysis.pending, (state) => {
      state.analysisdata.loading = true;
    });
    builder.addCase(getFlaggedQuestionAnalysis.rejected, (state,action) => {
      state.analysisdata.error = action.payload;
    });
    builder.addCase(getFlaggedQuestionAnalysis.fulfilled, (state, action) => {
      state.analysisdata.flaggedQuestions = action.payload.payload;
      state.analysisdata.meta = action.payload.meta;
      state.analysisdata.loading = false;
    });

    builder.addCase(getTestData.pending, (state) => {
      state.testdata.loading = true;
      state.testdata.doneLoading = false;
      state.testdata.error = false;
    });
    builder.addCase(getTestData.rejected, (state,action) => {
      if(inArray(action.payload.error,SUBMIT_ERROR)){
        state.meta.uniqueId = action.payload.uniqueId;
        prepareTestForSubmitting(state,action);
      }
      state.testdata.error = action.payload.error;

    });
    builder.addCase(getTestData.fulfilled, (state, action) => {
      state.meta = action.payload.meta;
      state.questionAnswers = prepareQuestions(state,action);
      state.questions = action.payload.questions;
      state.testdata.loading = false;
      state.testdata.doneLoading = true;
    });

    //Analysis Data
    builder.addCase(getTestAnalysisDetails.pending, (state) => {
      state.analysisdata.loading = true;
      state.analysisdata.doneLoading = false;
      state.analysisdata.error = false;
    });
    builder.addCase(getTestAnalysisDetails.rejected, (state,action) => {
      state.analysisdata.error = action.payload;
    });
    builder.addCase(getTestAnalysisDetails.fulfilled, (state, action) => {
      state.analysisdata.meta = action.payload.meta;
      state.analysisdata.details = action.payload.details;
      state.analysisdata.questions = action.payload.questions;
      state.analysisdata.questions = prepareQuestionAnalysis(state,action);
      state.analysisdata.loading = false;
      state.analysisdata.doneLoading = true;
    });

    //Sending Test
    builder.addCase(sendTestData.pending, (state) => {
      state.testdata.sendingloading = true;
      state.testdata.sendingDoneLoading = false;
      state.testdata.sendingError = false;
    });
    builder.addCase(sendTestData.rejected, (state,action) => {
      state.testdata.sendingError = action.payload;
      state.testdata.sendingDoneLoading = true;
    });
    builder.addCase(sendTestData.fulfilled, (state, action) => {
      state.testdata.sendingloading = false;
      state.testdata.resultData = action.payload;
      state.meta.uniqueId = action.payload.uniqueId;
      cleanupSubmit(state);
      state.testdata.sendingDoneLoading = true;
    });

    //Sending Flagged Toggle
    builder.addCase(toggleQuestionFlag.pending, (state,action) => {
      // console.log("Networking Starting",action);
      state.analysisdata.questionFlags[action.meta.arg.questionId].sendingloading = true;
    });
    builder.addCase(toggleQuestionFlag.rejected, (state,action) => {
      state.analysisdata.sendingError = action.payload;
      state.analysisdata.questionFlags[action.meta.arg.questionId].sendingloading = false;
      // console.log("Networking Error",action.payload);
    });
    builder.addCase(toggleQuestionFlag.fulfilled, (state, action) => {
      state.analysisdata.questionFlags[action.meta.arg.questionId].sendingloading = false;
      state.analysisdata.questionFlags[action.meta.arg.questionId].flagged = action.payload.flagged;
      // console.log("Networking Success",action.payload);
    });

    //Countries
    builder.addCase(fetchCountries.pending, (state, action) => {
      // console.log("Networking Starting",action);
      state.examsdata.sendingloadingCountry = true;
      state.examsdata.sendingloadingCountryDone = false;
    });
    builder.addCase(fetchCountries.rejected, (state, action) => {
      state.examsdata.sendingErrorCountry = action.payload;
      state.examsdata.sendingloadingCountry = false;
    });
    builder.addCase(fetchCountries.fulfilled, (state, action) => {
      state.examsdata.sendingloadingCountry = false;
      state.examsdata.sendingloadingCountryDone = true;
      state.examsdata.countries = action.payload.countries;
      state.examsdata.states = action.payload.states;
      // console.log("Networking Success", state.examsdata.countries);
    });
  },
});

export const {
      setExamMeta,
  setExamQuestions,
  updateCurrentAnswer,
  saveAnswered,
  prepareReview,
  prepareSubmit,
  updateExamError,
  sendToNetwork,
  setDurationFormatted,
  setTimeFinished,
  exitCleanUp,
  setGlobalFilter,
    setFlaggedArray,
  refreshFlaggedTable,
  selectState
} = examSlice.actions;

export default examSlice.reducer;
