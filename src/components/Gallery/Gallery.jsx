import { Fragment, useCallback, useRef } from "react";
import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useGlobalContext } from "../../context";

const url = `https://api.unsplash.com/search/photos?client_id=${
  import.meta.env.VITE_API_KEY
}`;

const Gallery = () => {
  const { searchTerm } = useGlobalContext();
  const intObserver = useRef();

  const fetchImages = async ({ pageParam = 1 }) => {
    const res = await axios.get(`${url}&page=${pageParam}&query=${searchTerm}`);
    return res.data;
  };

  const { data, status, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["images", searchTerm],
      queryFn: fetchImages,
      getNextPageParam: (lastPage, pages) =>
        pages.length < lastPage.total_pages ? pages.length + 1 : undefined,
    });

  const lastImageRef = useCallback(
    (image) => {
      if (isFetchingNextPage) return;
      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver(([images]) => {
        if (images.isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (image) intObserver.current.observe(image);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  );

  if (status === "loading") {
    return <h4>Loading...</h4>;
  }

  if (status === "error") {
    return <h4>There was an error...</h4>;
  }

  if (status === "success") {
    if (data?.pages[0].results.length < 1) return <h4>No images found...</h4>;
    return (
      <section className="grid">
        {data.pages.map((group, i) => {
          return (
            <Fragment key={i}>
              {group.results.map((item) => {
                return (
                  <img
                    key={item.id}
                    src={item.urls.regular}
                    alt={item.alt_description}
                    loading="lazy"
                    ref={lastImageRef}
                    className="grid_item"
                  />
                );
              })}
            </Fragment>
          );
        })}
      </section>
    );
  }
};

export default Gallery;
