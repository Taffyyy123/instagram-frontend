import Link from "next/link";
const goToPosts = (window.location.href = "/posts");
const Home = () => {
  return <div>{goToPosts}</div>;
};
export default Home;
