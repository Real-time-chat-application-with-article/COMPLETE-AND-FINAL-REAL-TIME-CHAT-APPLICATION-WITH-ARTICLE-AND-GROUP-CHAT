import { useState } from 'react';
import { SendOutlined, PictureOutlined } from '@ant-design/icons';
import { sendMessage, isTyping } from 'react-chat-engine';
import { IoMdSend } from "react-icons/io";
import EmojiPicker from "emoji-picker-react"
import { FaImage } from "react-icons/fa6";
import { FaVideo } from "react-icons/fa6";

const MessageForm = (props) => {
  const [value, setValue] = useState('');
  const { chatId, creds } = props;

  const handleChange = (event) => {
    setValue(event.target.value + emoji);

    isTyping(props, chatId);
  };
  //FUNCTION REPONSIBEL FOR RECEIVING USER EMOJIs
const handleEmojis  = e =>{
    setEmoji(prev => prev + e.emoji);
    setOpen(false)
  }

const [openImageVideoUpload,setOpenImageVideoUpload] = useState(false)
const handleUploadImageVideoOpen = ()=>{
    setOpenImageVideoUpload(preve => !preve)
  }

  const handleSendMessage = (event) => {
    event.preventDefault();
    setOpenImageVideoUpload(false)
    const text = value.trim() + emoji;

    if (text.length > 0) {
      sendMessage(creds, chatId, { text });
    }

    setValue('');
  };

  const handleUpload = (event) => {
    sendMessage(creds, chatId, { files: event.target.files, text: ''  });
    setOpenImageVideoUpload(false)
  };
  const [open, setOpen] = useState(false);
  const [emoji, setEmoji] = useState(" "); 

  return (
   
      <section className='h-16 bg-black flex items-center px-4 bottom group'>
      <div className='relative bottom-container'>
      <ion-icon  name="image-outline" onClick={handleUploadImageVideoOpen}></ion-icon>
      <ion-icon  name="camera" ></ion-icon>
         
          {/**video and image */}
          {
            openImageVideoUpload && (
              <div className='bg-white shadow rounded absolute bottom-14 w-36 p-2'>
              <form>
                  <label htmlFor='uploadImage' className='flex items-center p-2 px-3 gap-3 hover:bg-slate-200 cursor-pointer'>
                      <div className='text-primary'>
                          <FaImage size={18}/>
                      </div>
                      <p>Image</p>
                  </label>
                  <label htmlFor='uploadVideo' className='flex items-center p-2 px-3 gap-3 hover:bg-slate-200 cursor-pointer'>
                      <div className='text-purple-500'>
                          <FaVideo size={18}/>
                      </div>
                      <p>Video</p>
                  </label>

                  <input 
                    type='file'
                    id='uploadImage'
                    onChange={handleUpload.bind(this)}
                    className='hidden'
                  />

                  <input 
                    type='file'
                    id='uploadVideo'
                    onChange={handleUpload.bind(this)}
                    className='hidden'
                  />
              </form>
              </div>
            )
          }
          
      </div>

      {/**input box */}
      <form className='h-full w-full flex gap-2 input-field ' onSubmit={handleSendMessage}>
          <div className='input-area'>
          <input
            type='text'
            placeholder='Type here message...'
            className='py-1 px-4 outline-none w-full h-full'
            value={value}
            onChange={handleChange}
            onSubmit={handleSendMessage}
          />
          <ion-icon  name="happy" onClick={() => setOpen(prev => !prev)} ></ion-icon> 
          <div className="emoji-container">
                                         <EmojiPicker className='emoji-container' open={open} onEmojiClick={handleEmojis}  />
          </div> 
          
          </div>
          <button className='button'>
              <IoMdSend size={28}/>
          </button>
      </form>
      
  </section>
  );
};

export default MessageForm;
