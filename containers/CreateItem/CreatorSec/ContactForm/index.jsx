import { useState } from "react";
import {
  CreateItemDataImg,
  CreateItemDataInput,
} from "../../../../data/data-containers/data-ContactForm";
import { useFilePicker } from "use-file-picker";
import { File } from "nft.storage";
import { nftStorage, Tezos, useTezosCollectStore } from "api/store";
import { useRouter } from "next/router";
import Spinner from "./../../../../components/Spinner";
// import data from './data.json'

const ContactForm = () => {
  const router = useRouter();
  const [openFileSelector, { filesContent }] = useFilePicker({
    accept: [".png", ".jpg", ".jpeg"],
    multiple: false,
    readAs: "ArrayBuffer",
  });

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [amount, setAmount] = useState();
  const [royalties, setRoyalties] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const { nftMint } = useTezosCollectStore();
  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(filesContent);
    const imgFile = new File([filesContent[0].content], filesContent[0].name, {
      type: "image/" + filesContent[0].name.split(".")[1],
    });

    // upload img to ipfs
    const metadata = await nftStorage.store({
      name: name,
      description: description,
      artist: "Luan",
      size: "3000x300",
      collection: "My Collection",
      decimals: 0,
      symbol: "TBY",
      image: imgFile,
    });

    console.log(metadata.url);

    // mint
    await nftMint({ amount: price, metadata: metadata.url });

    setName("");
    setDescription("");
    setPrice(0);
    setAmount(0);
    setRoyalties(0);
    setIsLoading(false);
    router.push("/MyItems");
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
                <p className="w-text">Upload Item File</p>
                <div className="group-file">
                  <p className="g-text">
                    PNG, GIF, WEBP, MP4 or MP3. Max 100mb
                  </p>
                  <div
                    className="new_Btn more-btn"
                    onClick={(event) => {
                      openFileSelector();
                      event.preventDefault();
                    }}
                  >
                    Upload File
                  </div>
                  {filesContent.length > 0 ? filesContent[0].name : ""}
                  <br />
                  {/* <input type="file" name="upload" id="upload-btn" required /> */}
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
        <Spinner />
      )}
    </>
  );
};

export default ContactForm;
