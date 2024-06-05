
export const ActiveExamError = ({ msg,goBack }) => {
  return (
    <>
      <div className="col-md-12 student-details text-error-test  flexy">
        <div>
          <p>{msg}</p><br/>
            <button className="next-btn" onClick={goBack}>
                Go Back
            </button>
        </div>

      </div>
    </>
  );
};
