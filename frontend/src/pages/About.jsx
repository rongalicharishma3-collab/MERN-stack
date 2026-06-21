export default function About() {
  return (
    <section className="page grid gap-8 lg:grid-cols-2">
      <div>
        <h1 className="text-3xl font-extrabold">About Explore Vizag</h1>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Explore Vizag helps travelers and locals discover the best of Visakhapatnam through curated attractions, events, trip planning, favorites, reviews, and itineraries.
        </p>
        <p className="mt-4 text-slate-600">
          The platform is built for practical trip planning: find places, read details, save favorites, and shape your own city route.
        </p>
      </div>
      <img className="h-96 w-full rounded-lg object-cover" src="https://im.indiatimes.in/photogallery/2021/Nov/Visakhapatnam_6192437f27990.jpg" />
    </section>
  );
}
