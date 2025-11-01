import submitForm from './submitForm';

export default function App() {
  return (
    <form
      // Ignore the onSubmit prop, it's used by GFE to
      // intercept the form submit event to check your solution.
      onSubmit={submitForm}
      action="https://questions.greatfrontend.com/api/questions/contact-form"
      method="post"
    >
      <label htmlFor="name-input">Name:</label> 
      <input type="text" id="name-input" name="name" /> <br />
      <label htmlFor="email-input">Email:</label> 
      <input type="email" id="email-input" name="email" /><br />
      <label htmlFor="message-input">Message:</label> 
      <textarea id="message-input" name="message" /><br />
      <button>Send</button>
    </form>
  );
}
