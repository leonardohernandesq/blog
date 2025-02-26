import React, { useEffect, useState } from 'react';
import styles from './Login.module.css';
import { useAuthentication } from '../../hooks/useAuthentication';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const {login, error: authError, loading} = useAuthentication();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')

    const user = {
      email,
      password
    }

    const res = await login(user)

    console.log(res);
  }

  useEffect(() => {
    if(authError){
      setError(authError);
    }
  })


  return (
    <div className={styles.login}>
        <h1>Entrar</h1>
        <p>Faça o login para poder utilizar o sistema</p>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Email:</span>
            <input 
            type="email" 
            name="email" 
            placeholder='Email do usuário'
            value={email}
            onChange={(e) => {setEmail(e.target.value)}}
            required 
            />
          </label>
          <label>
            <span>Senha:</span>
            <input 
            type="password" 
            name="password" 
            placeholder='Insira sua senha'
            value={password}
            onChange={(e) => {setPassword(e.target.value)}}
            required 
            />
          </label>
          <button className='btn' disabled={loading}>
            {loading ? 'Aguarde...' : 'Entrar'}
          </button>
          {error && <p className={'error'}>{error}</p>}
        </form>


    </div>
  )
}
