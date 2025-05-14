import Product from "./product/page";
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
