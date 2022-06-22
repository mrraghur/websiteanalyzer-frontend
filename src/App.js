import { useState } from "react";
import "./App.css";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

function App() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(false);

  const handleLookup = (e) => {
    e.preventDefault();
    setLoading(true);

    axios
      .get(`https://api.wappalyzer.com/lookup/v2/?urls=${url}&sets=all`, {
        headers: {
          "x-api-key": "MjwEbO6oF43EtgMdooTqg7OQPFhYBdG18LoZMfJ8"
        }
      })
      .then((data) => {
        setLoading(false);
        console.log(data);
        if (Array.isArray(data)) {
          setResult(data);
        } else {
          setResult([data]);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <div className="p-5">
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
        <p className="text-sm text-opacity-40">
          Separate urls with a comma (",")
        </p>
      </div>

      {result && (
        <div className="flex flex-col w-screen max-w-[500px] mx-auto p-4 border-stone-100 rounded-md">
          {result.map((item, index) => {
            return (
              <div key={index} className="flex flex-col">
                <h2>{item.url}</h2>
                <div className="p-2">
                  <h3>Technologies:</h3>
                  {item.technologies.map((tech, index) => (
                    <div key={index} className="p-2">
                      <p>
                        Slug: <strong>{tech.slug}</strong>
                      </p>
                      <p>
                        Name: <strong>{tech.name}</strong>
                      </p>
                      <div>
                        <h4>Versions</h4>
                        {tech.versions.map((version, index) => (
                          <p key={index}>{version}</p>
                        ))}
                      </div>
                      <div>
                        <h4>Categories</h4>
                        {tech.categories.map((category, index) => (
                          <div key={index} className="p-2">
                            <p>
                              slug: <strong>{category.slug}</strong>
                            </p>
                            <p>
                              name: <strong>{category.name}</strong>
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  {item.trafficRank && (
                    <p>
                      trafficRank: <strong>{item.trafficRank}</strong>
                    </p>
                  )}
                  {item.confirmedAt && (
                    <p>
                      confirmedAt: <strong>{item.confirmedAt}</strong>
                    </p>
                  )}
                  {item.email && (
                    <div>
                      <h4>email</h4>
                      {item.email.map((email, index) => (
                        <p key={index} className="p-2">
                          {email}
                        </p>
                      ))}
                    </div>
                  )}
                  {item.verifiedEmail && (
                    <div>
                      <h4>verifiedEmail</h4>
                      {item.verifiedEmail.map((email, index) => (
                        <p key={index} className="p-2">
                          {email}
                        </p>
                      ))}
                    </div>
                  )}
                  {item.safeEmail && (
                    <div>
                      <h4>safeEmail</h4>
                      {item.safeEmail.map((email, index) => (
                        <p className="p-2" key={index}>
                          {email}
                        </p>
                      ))}
                    </div>
                  )}
                  {item.phone && (
                    <div>
                      <h4>phone</h4>
                      {item.phone.map((phone, index) => (
                        <p className="p-2" key={index}>
                          {phone}
                        </p>
                      ))}
                    </div>
                  )}
                  {item.linkedin && (
                    <div>
                      <h4>linkedin</h4>
                      {item.linkedin.map((linkedin, index) => (
                        <p className="p-2" key={index}>
                          {linkedin}
                        </p>
                      ))}
                    </div>
                  )}
                  {item.twitter && (
                    <div>
                      <h4>twitter</h4>
                      {item.twitter.map((twitter, index) => (
                        <p className="p-2" key={index}>
                          {twitter}
                        </p>
                      ))}
                    </div>
                  )}
                  {item.facebook && (
                    <div>
                      <h4>facebook</h4>
                      {item.facebook.map((facebook, index) => (
                        <p className="p-2" key={index}>
                          {facebook}
                        </p>
                      ))}
                    </div>
                  )}
                  {item.title && (
                    <p>
                      title: <strong>{item.title}</strong>
                    </p>
                  )}
                  {item.description && (
                    <p>
                      description: <strong>{item.description}</strong>
                    </p>
                  )}
                  {item.companyName && (
                    <p>
                      companyName: <strong>{item.companyName}</strong>
                    </p>
                  )}
                  {item.inferredCompanyName && (
                    <p>
                      inferredCompanyName:{" "}
                      <strong>{item.inferredCompanyName}</strong>
                    </p>
                  )}
                  {item.industry && (
                    <p>
                      industry: <strong>{item.industry}</strong>
                    </p>
                  )}
                  {item.about && (
                    <p>
                      about: <strong>{item.about}</strong>
                    </p>
                  )}
                  {item.locations && (
                    <div>
                      <h4>locations</h4>
                      {item.locations.map((item, index) => (
                        <p key={index} className="p-2">
                          {item}
                        </p>
                      ))}
                    </div>
                  )}
                  {item.companySize && (
                    <p>
                      companySize: <strong>{item.companySize}</strong>
                    </p>
                  )}
                  {item.companyType && (
                    <p>
                      companyType: <strong>{item.companyType}</strong>
                    </p>
                  )}
                  {item.companyFounded && (
                    <p>
                      companyFounded: <strong>{item.companyFounded}</strong>
                    </p>
                  )}

                  {item.employees && (
                    <div>
                      <h4>employees</h4>
                      {item.employees.map((item, index) => (
                        <div key={index} className="p-2 ">
                          <p>
                            name: <strong>{item.name}</strong>
                          </p>
                          <p>
                            title: <strong>{item.title}</strong>
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {item.keywords && (
                    <div>
                      <h4>keywords</h4>
                      {item.keywords.map((item, index) => (
                        <p key={index} className="p-2">
                          name: <strong>{item}</strong>
                        </p>
                      ))}
                    </div>
                  )}
                  {item.technologySpeed && (
                    <p>
                      technologySpeed: <strong>{item.technologySpeed}</strong>
                    </p>
                  )}

                  {item.schemaOrgTypes && (
                    <div>
                      <h4>schemaOrgTypes</h4>
                      {item.schemaOrgTypes.map((item, index) => (
                        <p key={index} className="p-2">
                          {item}
                        </p>
                      ))}
                    </div>
                  )}

                  {item["certInfo.issuer"] && (
                    <p>
                      certInfo.issuer:{" "}
                      <strong>{item["certInfo.issuer"]}</strong>
                    </p>
                  )}

                  {item["certInfo.validTo"] && (
                    <p>
                      certInfo.validTo:{" "}
                      <strong>{item["certInfo.validTo"]}</strong>
                    </p>
                  )}
                  {item["certInfo.protocol"] && (
                    <p>
                      certInfo.protocol:{" "}
                      <strong>{item["certInfo.protocol"]}</strong>
                    </p>
                  )}
                  {item.ipCountry && (
                    <p>
                      ipCountry: <strong>{item.ipCountry}</strong>
                    </p>
                  )}
                  {item.regio && (
                    <p>
                      region: <strong>{item.region}</strong>
                    </p>
                  )}
                  {item.language && (
                    <p>
                      language: <strong>{item.language}</strong>
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;
