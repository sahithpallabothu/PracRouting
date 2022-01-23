import { useState,useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react/cjs/react.development';
import useHttp from '../../hooks/use-http';
import { getAllComments } from '../../lib/api';
import classes from './Comments.module.css';
import NewCommentForm from './NewCommentForm';
import LoadingSpinner from '../UI/LoadingSpinner';
import CommentsList from '../comments/CommentsList';

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const params = useParams();
  const {quoteId} = params;
  const {sendRequest,status,data:loadedComments} = useHttp(getAllComments);
  useEffect(()=>{
    sendRequest(quoteId)
  },[sendRequest,quoteId]);

  const addCommentHandler = useCallback(() => {
    sendRequest(quoteId);
  },[sendRequest,quoteId]);

  let comments;
  if(status === 'pending'){
    comments = (
        <div className="centered">
            <LoadingSpinner/>
        </div>
    );
}
  if(status === 'completed' && (loadedComments && loadedComments.length > 0)){
    comments = (
      <CommentsList comments={loadedComments}/>
    )
  }
  if(status === 'completed' && (!loadedComments || loadedComments.length === 0)){
    comments = (
      <p className='centered'>No Comments Found</p>
    )
  }

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };
  
  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && <NewCommentForm onAddedComment={addCommentHandler} quoteId={quoteId}/>}
      {comments}
    </section>
  );
};

export default Comments;
