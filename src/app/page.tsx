import Product from "./components/Product";
import Navigation from "./components/Navigation";

export default function Home() {
  return (
    <div>
      {/* navbar */}
      <Navigation />

      {/* product */}
      <Product />
    </div>
  );
}
