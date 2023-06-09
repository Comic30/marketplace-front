import { useState } from "react";
import { useFilePicker } from "use-file-picker";
import { File } from "nft.storage";
import { nftStorage, useTezosCollectStore, openai } from "api/store";
import { useRouter } from "next/router";
import { PropagateLoader } from "react-spinners";

// import data from './data.json'

const ContactForm = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [amount, setAmount] = useState(0);
  const [royalties, setRoyalties] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [story, setStory] = useState("");
  const [image, setImage] = useState("");

  const { nftMint, fetchBase64Image } = useTezosCollectStore();
  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (image) {
        const url = `data:image/png;base64,${image}`;
        const res = await fetch(url);
        if (res) {
          const blob = await res.blob();

          // upload img to ipfs
          const metadata = await nftStorage.store({
            name: name,
            description: description,
            artist: "Comic30",
            size: "512x512",
            collection: "Test Collection",
            decimals: 0,
            symbol: "TBY",
            image: blob,
          });

          console.log(metadata);

          // mint
          const ret = await nftMint({ amount: price, metadata: metadata.url });
          if (ret == true) {
            setName("");
            setDescription("");
            setPrice(0);
            setAmount(0);
            setRoyalties(0);
            setIsLoading(false);
            router.push("/MyItems");
          }
        } else {
          console.log("Create NFT Error");
        }
      }
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
  };

  const generateImage = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetchBase64Image({ story }, localStorage.token);
      setImage(res);
    } catch (err) {
      // console.error(err);
    }
    setIsLoading(false);
  };

  return (
    <>
      {!isLoading ? (
        <div className="contact_form">
          <form action="#" method="post" id="main_contact_form" noValidate>
            <div className="row">
              <div className="col-12">
                <div id="success_fail_info"></div>
              </div>

              <div className="col-12 col-md-12">
                <div className="row">
                  <p className="col-12 col-md-12 w-text">
                    Generate an Image using OpenAI
                  </p>
                  <textarea
                    className="col-8 col-md-8 p-1"
                    type="text"
                    name="story"
                    id="story"
                    placeholder="Input the story"
                    value={story}
                    onChange={(e) => setStory(e.target.value)}
                    required
                  />
                  <div className="col-1 col-md-1">{}</div>
                  <div
                    className="col-3 col-md-3 more-btn"
                    onClick={generateImage}
                  >
                    Generate Image
                  </div>
                  <canvas id="canvas" hidden></canvas>
                  <div className="col-12 col-md-12 group-file">
                    {image ? (
                      <>
                        <img
                          src={`data:image/png;base64,${image}`}
                          alt=""
                          style={{ height: "100%", width: "100%" }}
                        />
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-12">
                <div className="group">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Item name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <span className="highlight"></span>
                  <span className="bar"></span>
                </div>
              </div>
              {/* <div className="col-12 col-md-12">
              <div className="mb-15">
                <p>Choose item Category</p>
                <div className="filers-list ">
                  {CreateItemDataImg &&
                    CreateItemDataImg.map((item, i) => (
                      <button key={i} className="filter-item">
                        <img src={item.img.src} alt="" />
                        {item.text}
                      </button>
                    ))}
                </div>
              </div>
            </div> */}
              <div className="col-12">
                <div className="group">
                  <textarea
                    name="Description"
                    id="Description"
                    placeholder="Item Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  ></textarea>
                  <span className="highlight"></span>
                  <span className="bar"></span>
                </div>
              </div>
              <div className="col-12">
                <div className="group">
                  <input
                    type="text"
                    name="Price"
                    id="Price"
                    placeholder="Item Price in Tezos"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                  <span className="highlight"></span>
                  <span className="bar"></span>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="group">
                  <input
                    type="text"
                    name="Royalties"
                    id="Royalties"
                    placeholder="Royalties"
                    value={royalties}
                    onChange={(e) => setRoyalties(e.target.value)}
                    required
                  />
                  <span className="highlight"></span>
                  <span className="bar"></span>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="group">
                  <input
                    type="text"
                    name="copies"
                    id="copies"
                    placeholder="Number of copies"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                  />
                  <span className="highlight"></span>
                  <span className="bar"></span>
                </div>
              </div>
              {/* {CreateItemDataInput &&
              CreateItemDataInput.map((item, i) => (
                <div
                  key={i}
                  className={`col-12 ${item.fullWidth && "col-md-12"} ${
                    item.hafWidth && "col-md-6"
                  }`}
                >
                  <div className="group">
                    <input
                      type="text"
                      name={item.name}
                      id={item.name}
                      placeholder={item.title}
                      required
                    />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                  </div>
                </div>
              ))} */}

              <div className="col-12 text-center">
                <button
                  type="submit"
                  className="more-btn mb-15"
                  onClick={(e) => onSubmit(e)}
                >
                  Create Item
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <div className="loader">
          <PropagateLoader color="#36d7b7" />
        </div>
      )}
    </>
  );
};

export default ContactForm;
