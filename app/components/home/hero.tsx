import Button from "../shared/button";

export default function Hero({ title }: { title: string }) {
  return (
    <div className="flex justify-center items-center h-[25rem] md:h-[35rem] max-w-screen-2xl mx-auto bg-primary">
      <div className="p-10">
        <h1 className="text-6xl md:text-8xl text-center text-white">
          {title}
        </h1>
        <div className="flex mt-10 space-x-2 justify-center">
          <Button text="Contact Us" color="bg-sauceRed" to="/contactUs" />
        </div>
      </div>
      <div></div>
    </div>
  );
}
