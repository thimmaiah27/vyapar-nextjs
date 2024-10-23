'use client'

import { useState, useEffect, useRef } from 'react'
import styles from './ChatInterface.module.css'

export default function ChatInterface() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const chatMessagesRef = useRef(null)
  const [isSidebarActive, setIsSidebarActive] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsSidebarCollapsed(true)
        setIsSidebarActive(false)
      } else {
        setIsSidebarCollapsed(false)
        setIsSidebarActive(true)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleSidebar = () => {
    if (window.innerWidth <= 768) {
      setIsSidebarActive(!isSidebarActive)
    } else {
      setIsSidebarCollapsed(!isSidebarCollapsed)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (inputValue.trim()) {
      addMessage('user', inputValue)
      simulateResponse(inputValue)
      setInputValue('')
    }
  }

  const addMessage = (sender, text) => {
    setMessages(prev => [...prev, { sender, text }])
    setTimeout(() => {
      if (chatMessagesRef.current) {
        chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight
      }
    }, 0)
  }

  const simulateResponse = (userMessage) => {
    setTimeout(() => {
      const response = `This is a simulated response to: "${userMessage}"`
      addMessage('ai', response)
    }, 1000)
  }

  return (
    <div className={styles.container}>
      <div 
        className={`${styles.overlay} ${isSidebarActive ? styles.active : ''}`} 
        onClick={toggleSidebar}
      ></div>
      <div className={styles.hamburgerMenu} onClick={toggleSidebar}>
        <i className="fa-solid fa-bars"></i>
      </div>
      <aside className={`
        ${styles.sidebar} 
        ${isSidebarCollapsed ? styles.collapsed : ''} 
        ${isSidebarActive ? styles.active : ''}
      `}>
        <ul>
          <li><i className="fa-solid fa-plus"></i><span>New</span></li>
          <li><i className="fa-regular fa-pen-to-square"></i><span>Update</span></li>
          <li><i className="fa-solid fa-ban"></i><span>Cancel</span></li>
        </ul>
      </aside>
      <main className={`
        ${styles.mainContent} 
        ${isSidebarCollapsed ? styles.sidebarCollapsed : ''}
        ${isSidebarActive ? styles.sidebarActive : ''}
      `}>
        <header className={styles.mainNav}>Vyapar</header>
        <div id="chat-messages" className={styles.content} ref={chatMessagesRef}>
          {messages.map((message, index) => (
            <div key={index} className={`${styles.message} ${styles[message.sender]}`}>
              {message.text}
            </div>
          ))}
        </div>
        <div className={styles.inputArea}>
          <form id="chat-form" onSubmit={handleSubmit}>
            <textarea
              id="user-input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Message Gemini..."
              rows={1}
            />
            <button type="submit"><i className="fa-solid fa-paper-plane"></i></button>
          </form>
        </div>
      </main>
    </div>
  )
}