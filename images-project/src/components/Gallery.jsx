import { useEffect, useState } from "react";

const url =
  "https://api.unsplash.com/search/photos?client_id=luqIRSHEGX1hdTA0mByfX0lC8kq5jV1WhtM50UPYR1Y&query=monkey";

export const Gallery = () => {
    const[ results, setResults] = useState([])
  const getImages = async () => {
    const res = await fetch(url);
    if (res.isLoading) {
      return (
        <section>
          <h4>Loading...</h4>
        </section>
      );
    }
    if (res.isError) {
      return (
        <section>
          <h4>There was an Error...</h4>
        </section>
      );
    }
    if (res.length < 1) {
      return <section>No results found...</section>;
    }
    const results = await res.json();
    setResults(results)
    // console.log(results.results.map(x=>x.urls.regular))

  }
  
    useEffect(() => {
      getImages();
      
    }, []);


    return (
      <section className="image-container">
          {results.results?.map((x) => {
          const url = x?.urls?.regular;
          return <img src={url} key={x.id} />;
        })}  
      </section>
    );
  };

