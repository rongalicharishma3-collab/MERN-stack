export default function Contact() {
  return (
    <section className="page max-w-3xl">
      <h1 className="text-3xl font-extrabold">Contact</h1>
      <p className="mt-2 text-slate-600">Send travel suggestions, partnership ideas, or content updates.</p>
      <form className="card mt-6 grid gap-4 p-6">
        <input className="input" placeholder="Name" />
        <input className="input" type="email" placeholder="Email" />
        <textarea className="input min-h-32" placeholder="Message" />
        <button className="btn-primary" type="button">Send Message</button>
      </form>
    </section>
  );
}
