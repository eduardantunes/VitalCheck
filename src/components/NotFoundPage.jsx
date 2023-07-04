import "./NotFoundPage.css";

const NotFoundPage = () => {
  return (
    <div className="wrapper">
      <div className="containerpage" data-text={404}>
        <div className="title glitch" data-text={404}>
          404
        </div>
        <div className="description glitch" data-text="PAGE NOT FOUND">
          PAGE NOT FOUND
        </div>
        <p><a className="link-offset-2 link-underline link-underline-opacity-0" href="/">VOLTAR PARA HOME</a></p>
      </div>
    </div>
  );
};

export default NotFoundPage;
