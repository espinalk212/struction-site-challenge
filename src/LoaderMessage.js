import Loader from 'react-loader-spinner';

const LoaderMessage = () => {
  return (
    <div className="loaderContainer">
      <p>Please wait while we load the map...</p>
      <Loader type="Rings" color="#f76c2e" height={100} width={100} />
    </div>
  );
};

export default LoaderMessage;
