import Header from "@/components/Main/Header";
import TopTen from "@/components/Main/TopTen";
import MovieRow from "@/components/Main/MovieRow";

export default function MainPage() {
  return (
    <div className="relative h-full">
      {" "}
      <Header />{" "}
      <div className="relative bg-black text-white overflow-y-auto h-full">
        <TopTen />
        <div className="mt-[600px]">
          <MovieRow type="mylist" />
          <MovieRow type="action" />
          <MovieRow type="original" />
          <MovieRow type="korea" />
        </div>
      </div>
    </div>
  );
}
