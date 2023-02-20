import React from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';
import axios from '../../axios'

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import { useNavigate, useParams } from 'react-router-dom';

export const AddPost = () => {
  const { id } = useParams()
  const isAditing = Boolean(id)
  const navigate = useNavigate()
  const [imageUrl, setImageUrl] = React.useState('')
  const [text, setText] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [tags, setTags] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const inputImageRef = React.useRef(null)

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('image', file)
      const { data } = await axios.post('/upload', formData)
      setImageUrl(data.url)
    } catch (error) {
      console.warn(error);
    }
  };

  React.useEffect(() => {
    if (id) {
      axios.get(`/posts/${id}`).then(({ data }) => {
        setText(data.text);
        setTitle(data.title);
        setTags(data.tags);
        setImageUrl(data.imageUrl)
      })
    }
  }, [])

  const onClickRemoveImage = () => {
    setImageUrl('')
  };

  const onSubmit = async () => {
    try {
      setIsLoading(true)

      const fields = {
        title,
        imageUrl,
        tags,
        text
      }

      const { data } = isAditing ? await axios.patch(`/posts/${id}`, fields) : await axios.post('/posts', fields)
      const _id = isAditing ? id : data._id

      navigate(`/posts/${_id}`)
    } catch (error) {
      console.warn(error)
      alert('Error create post')
    }
  }

  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );

  return (
    <Paper style={{ padding: 30 }}>
      <Button onClick={() => inputImageRef.current.click()} variant="outlined" size="large">
        Загрузить превью
      </Button>
      <input ref={inputImageRef} type="file" onChange={handleChangeFile} hidden />
      {imageUrl && (
        <>
          <Button variant="contained" color="error" onClick={onClickRemoveImage}>
            Удалить
          </Button>
          <img className={styles.image} src={`http://localhost:4444${imageUrl}`} alt="Uploaded" />
        </>
      )}

      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      <TextField
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Тэги"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        fullWidth />
      <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          {isAditing ? 'Сохранить изменения' : 'Опубликовать'}
        </Button>
        <a href="/">
          <Button size="large">Отмена</Button>
        </a>
      </div>
    </Paper>
  );
};
