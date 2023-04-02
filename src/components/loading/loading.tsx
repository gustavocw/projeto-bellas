import "./loading.css"
import { Spinner } from "@chakra-ui/react";

const Loading = () => {
  return (
    <div className="loading" >
    <Spinner
      style={{ margin: 'auto' }}
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="pink.500"
      size="xl"
    />
  </div>
  );
};

export default Loading;