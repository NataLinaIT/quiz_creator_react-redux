import React, { Component } from "react";
import { connect } from "react-redux";
import "./Quiz.css";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import Loader from "../../components/UI/Loader/Loader";
import {
  fetchQuizeById,
  quizAnswerClick,
  retryQuiz,
} from "../../redux/actions/quiz";

class Quiz extends Component {
  componentDidMount() {
    this.props.fetchQuizeById(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.retryQuiz();
  }

  render() {
    const {
      loading,
      quiz,
      isFinished,
      results,
      retryQuiz,
      activeQuestion,
      quizAnswerClick,
      answerState,
    } = this.props;
    return (
      <div className="quiz">
        <div className="quizWrapper">
          <h2>Choose correct option:</h2>

          {loading || !quiz ? (
            <Loader />
          ) : isFinished ? (
            <FinishedQuiz results={results} quiz={quiz} onRetry={retryQuiz} />
          ) : (
            <ActiveQuiz
              answers={quiz[activeQuestion].answers}
              question={quiz[activeQuestion].question}
              onAnswerClick={quizAnswerClick}
              quizLength={quiz.length}
              answerNumber={activeQuestion + 1}
              state={answerState}
            />
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    quizes: state.quiz.quizes,
    results: state.quiz.results,
    isFinished: state.quiz.isFinished,
    activeQuestion: state.quiz.activeQuestion,
    answerState: state.quiz.answerState,
    quiz: state.quiz.quiz,
    loading: state.quiz.loading,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    fetchQuizeById: (id) => dispatch(fetchQuizeById(id)),
    quizAnswerClick: (answerId) => dispatch(quizAnswerClick(answerId)),
    retryQuiz: () => dispatch(retryQuiz()),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
