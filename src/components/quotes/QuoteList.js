import { Fragment } from 'react';
import { useHistory,useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import QuoteItem from './QuoteItem';
import classes from './QuoteList.module.css';

const sortQuotes = (quotes, ascending) => {
  return quotes.sort((quoteA, quoteB) => {
    if (ascending) {
      return quoteA.id > quoteB.id ? 1 : -1;
    } else {
      return quoteA.id < quoteB.id ? 1 : -1;
    }
  });
};

const QuoteList = (props) => {

  const hist = useHistory();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const isSortAscending = queryParams.get('sort') === 'asc';
  const sortedQuotes = sortQuotes(props.quotes,isSortAscending);

  const changeSortingHandler = () =>{
   hist.push({
     pathname:location.pathname,
     search:`?sort=${(isSortAscending ? 'desc' : 'asc')}`
   });
   // hist.push(`${location.pathname}?sort=${(isSortAscending ? 'desc' : 'asc')}`);
  }

  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={changeSortingHandler}>Sort {isSortAscending ? 'Descending' : 'Ascending'}</button>
      </div>
      <ul className={classes.list}>
        {sortedQuotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
