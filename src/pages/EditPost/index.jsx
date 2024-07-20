import React, { useEffect, useState } from 'react'
import styles from './EditPost.module.css'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuthValue } from '../../context/AuthContext'
import { useUpdateDocument } from '../../hooks/useUpdateDocument';
import { useFetchDocument } from '../../hooks/useFetchDocument';

export default function EditPost() {
  const {id} = useParams();
  const {document:post} = useFetchDocument("posts", id);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  useEffect(() => {

    if(post){
      setTitle(post.title);
      setImage(post.image);
      setBody(post.body);

      const textTags = post.tagsArray.join(", ")

      setTags(textTags);
    }

  }, [post])


  const navigate = useNavigate();

  const {user} = useAuthValue();

  const {updateDocument, response} = useUpdateDocument("posts");

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    //validate image URL
    try{
      new URL(image)
    } catch (error){
      setFormError("A imagem precisa ser uma URL")
    }
    
    //create tags arr
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    if(!title || !image || !tags || !body){
      setFormError("Por favor, preencha todos os campos!")
    }

    if(formError) return;

    const data = {
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName
    }

    updateDocument(id, data);

    navigate('/dashboard');
  }

  return (
    <div className={styles.edit_post}>
      {
        post && (
          <>
            <h2>Editar Post: {post.title}</h2>
            <p>Altere os dados do post como desejas</p>
            <form onSubmit={handleSubmit}>
              <label>
                <span>Título</span>
                <input 
                  type="text" 
                  name="title" 
                  required 
                  placeholder='Pense num bom titulo...'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}  
                />
              </label>
              <label>
                <span>URL da imagem:</span>
                <input 
                  type="text" 
                  name="image" 
                  required 
                  placeholder='Insira uma imagem que representa seu post'
                  value={image}
                  onChange={(e) => setImage(e.target.value)}  
                />
              </label>
              <p className={styles.preview_title}>Preview da imagem atual:</p>
              <img className={styles.image_preview} src={post.image} alt={post.title} />
              <label>
                <span>Conteúdo do Blog</span>
                <textarea
                  type="text" 
                  name="body" 
                  required 
                  placeholder='Insira o conteúdo do post'
                  value={body}
                  onChange={(e) => setBody(e.target.value)}  
                ></textarea>
              </label>
              <label>
                <span>Tags</span>
                <input 
                  type="text" 
                  name="tags" 
                  required 
                  placeholder='Insira as tags separadas por vírgula'
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}  
                />
              </label>
              <button className='btn' disabled={response.loading}>
                  {response.loading ? 'Aguarde...' : 'Editar'}
              </button>
              {response.error && <p className={'error'}>{response.error}</p>}
              {formError && <p className={'error'}>{formError}</p>}
            </form>
        </>
        )
      }
    </div>
  )
}
