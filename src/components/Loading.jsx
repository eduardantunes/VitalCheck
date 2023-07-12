const Loading = (props) => {
  return (
    <div className="d-flex bg-white z-50 select-none position-fixed fixed-top fixed-left justify-content-center align-items-center w-100 h-100">
      <div role="status" className="d-flex flex justify-content-center align-items-center">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only"></span>
        </div>
        <span className="text-gray-400">
          {props.texto ? props.texto : "Carregando..."}
        </span>
      </div>
    </div>
  );
};

export default Loading;
