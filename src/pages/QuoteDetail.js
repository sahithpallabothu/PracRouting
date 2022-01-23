import { Fragment,useEffect } from "react";
import { Route, Link ,useParams,useRouteMatch} from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api"; 
import LoadingSpinner from "../components/UI/LoadingSpinner";

const QuoteDetail = () => {
  const params = useParams();
  const match = useRouteMatch();
  console.log(match);

  const { quoteId } = params;
  const { sendRequest,status,data:loadedQuote,error} = useHttp(getSingleQuote,true);
  useEffect(()=>{
    sendRequest(quoteId);
  },[sendRequest,quoteId])


  if(status === 'pending'){
    return (
        <div className="centered">
            <LoadingSpinner/>
        </div>
    );
}

if(error){
  return (
      <p className="centered focused">{error}</p>
  )
}
  
  if (!loadedQuote.text) {
    return <p>No Quote Found!</p>;
  }
  const pathValue = `${match.path}/comments`;
  return (
    <Fragment>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      <Route path={match.path} exact>  
        <div className="centered">
          <Link className="btn--flat" to={`${match.url}/comments`}>
            Load Comments
          </Link>
        </div>
      </Route>
      <Route path={pathValue}>
        <Comments />
      </Route>
    </Fragment>
  );
};

export default QuoteDetail;
