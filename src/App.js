import { useState } from "react";
import "./App.css";
import CircularProgress from "@mui/material/CircularProgress";
import { TechnologyCard } from "./components/cards";

function App() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(false);

  const handleLookup = (e) => {
    e.preventDefault();
    setLoading(true);

    const headers = new Headers();

    fetch(`/lookup?urls=${url}&sets=all`, {
      headers
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        console.log("data", data);
        setResult(data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <div className="p-5">
      <h1 className="text-4xl text-center font-bold mb-5">Technology Lookup</h1>
      <div className="mb-5 text-left border-stone-100 rounded-lg p-4 w-full sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto bg-blue-100 items-stretch">
        <h1 className="mb-4">Type in a url</h1>
        <form
          className="flex flex-row bg-red gap-2 items-center justify-center h-10 mb-2"
          onSubmit={handleLookup}
        >
          <input
            type="text"
            placeholder="Type in a url"
            className="w-4/5 border rounded-md p-1 h-full"
            required
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
          <button
            type="submit"
            value="Lookup"
            className="w-1/5 h-full rounded-md cursor-pointer border self-stretch justify-self-stretch bg-blue-700 text-white flex justify-center items-center"
          >
            {loading ? (
              <CircularProgress color="inherit" size={15} />
            ) : (
              "Lookup"
            )}
          </button>
        </form>
        {/* <p className="text-sm text-opacity-40">
          Separate urls with a comma (",")
        </p> */}
      </div>

      {result ? result.urls ? (
        result.urls[Object.keys(result.urls)[0]].status > 0 ? (
          <div className="flex flex-col w-screen mx-auto p-4 rounded-md">
            <h1 className="text-3xl font-bold mb-4 border-b border-gray-200">Result</h1>

            <div className="mb-3 flex items-end">
              <h2 className="text-xl font-bold mr-2">URLs:</h2>
              <span>
                {Object.keys(result.urls).map((url, id) => {
                  return (
                    <>
                      <a href={url} target="_blank" rel="noreferrer">
                        {url}
                      </a>
                      {id !== Object.keys(result.urls).length - 1 && ", "}
                    </>
                  );
                })}
              </span>
            </div>

            <div className="mb-3">
              <span className="text-xl font-bold mb-3">DOM Inspections:</span>
              <p className="text-sm mb-1 px-4">
                <span className="font-bold">Login:</span>{" "}
                {Object.values(result.inspects.login).filter(
                  (item) => item.length
                ).length
                  ? "Yes"
                  : "No"}
              </p>
              <p className="text-sm mb-1 px-4">
                <span className="font-bold">Subsription:</span>{" "}
                {Object.values(
                  result.inspects.subscribe.inputBtnEls[0].subscribe
                ).filter((item) => item.length).length
                  ? "Yes"
                  : "No"}
              </p>
              <p className="text-sm mb-1 px-4">
                <span className="font-bold">LiveChat Integration:</span>{" "}
                {Object.values(result.inspects.livechats).filter(
                  (item) => item.length
                ).length
                  ? "Yes"
                  : "No"}
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-2 border-b border-gray-200 pb-2">Technologies:</h2>
              <div className="responsive-row pt-2">
                {result.technologies.map((technology) => {
                  return <TechnologyCard technology={technology} />;
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className="mx-auto text-center">
            <p>{result.urls[Object.keys(result.urls)[0]].error}</p>
          </div>
        )
      ) : (
        <div className="mx-auto text-center">
          <p>Not a valid url, please type in a valid url</p>
        </div>
      ) : ""}
    </div>
  );
}

export default App;
