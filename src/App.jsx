import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [list, setList] = useState([]);

  useEffect(() => {
    handleFetch();
  }, []);

  const handleFetch = async () => {
    try {
      const val = await fetch(
        "https://s3.amazonaws.com/open-to-cors/assignment.json"
      );
      const jsonvalue = await val.json();
      console.log(jsonvalue);
      const productarr = Object.keys(jsonvalue.products).map((key) => ({
        id: key,
        ...jsonvalue.products[key],
      }));
      // console.log(productarr);
      const sortprod = productarr.sort(
        (val1, val2) => parseInt(val2.popularity) - parseInt(val1.popularity)
      );
      // console.log(sortprod);
      setList(sortprod);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div>
        <h1>Product List</h1>
      </div>
      {list.length === 0 ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <table
            border="3"
            style={{ border: "2px solid black", width: "100%" }}
          >
            <thead>
              <tr>
                <th>SubCategory</th>
                <th>Title</th>
                <th>Price</th>
                <th>Popularity</th>
              </tr>
            </thead>
            <tbody>
              {list.map((item) => (
                <tr key={item.id}>
                  <td>{item.subcategory}</td>
                  <td>{item.title}</td>
                  <td>{item.price}</td>
                  <td>{item.popularity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default App;
