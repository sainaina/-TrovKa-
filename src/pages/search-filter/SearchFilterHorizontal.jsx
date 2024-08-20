import React, { useEffect, useState, useMemo } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaList } from "react-icons/fa6";
import { TbGridDots } from "react-icons/tb";
import { Pagination } from "../../components/common/Pagination";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchServices,
  searchServicesByName,
} from "../../redux/feature/service/serviceSlice";
import CartService from "../../components/cart/CartService";
import LoadingComponent from "../../components/common/LoadingComponent";
import SlideService from "../../components/animation/SlideService";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { debounce } from "lodash";
import {
  fetchCategories,
  fetchCategoryTypes,
  selectCategories,
  selectCategoryTypes,
} from "../../redux/feature/category/cateSlice";
import {
  fetchReviews,
  selectReviews,
} from "../../redux/feature/review/reviewSlice";
import HorizontalCard from "../../components/cart/HorizontalCard";
import { Metadata } from "../../lib/Metadata";

export const SearchFilterHorizontal = () => {
  const dispatch = useDispatch();
  const services = useSelector((state) => state.services.data);
  const serviceStatus = useSelector((state) => state.services.status);
  const reviews = useSelector(selectReviews);
  const [popularServices, setPopularServices] = useState([]);
  const categoryTypes = useSelector(selectCategoryTypes);
  const categories = useSelector(selectCategories);
  const error = useSelector((state) => state.services.error);
  const [isSortByOpen, setIsSortByOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [sortBy, setSortBy] = useState("All");
  const [sortCriteria, setSortCriteria] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [servicesPerPage] = useState(6);
  const [activeCategoryType, setActiveCategoryType] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCategoryType, setSelectedCategoryType] = useState(null);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { search } = useLocation();

  useEffect(() => {
    dispatch(fetchCategoryTypes());
    dispatch(fetchCategories());
    dispatch(fetchReviews());

    const params = new URLSearchParams(search);
    const query = params.get("query");
    const category = params.get("category");
    const categoryType = params.get("categoryType");

    // Handle query and search services by name
    if (query && query !== searchQuery) {
      setSearchQuery(query);
      dispatch(
        searchServicesByName({ name: query, sortBy: category || "All" })
      );
    }

    // Handle category selection based on categories
    const selectedCat = categories.find(
      (cat) => cat.category_name === category
    );

    if (selectedCat && selectedCat !== selectedCategory) {
      setSelectedCategory(selectedCat);
    } else if (!selectedCat && selectedCategory !== null) {
      setSelectedCategory(null);
    }

    // Handle category type selection based on category types
    const selectedCatType = categoryTypes.find(
      (type) => type.name === categoryType
    );

    if (selectedCatType && selectedCatType !== selectedCategoryType) {
      setSelectedCategoryType(selectedCatType);
    } else if (!selectedCatType && selectedCategoryType !== null) {
      setSelectedCategoryType(null);
    }
  }, [
    dispatch,
    search,
    categories,
    categoryTypes,
    searchQuery,
    selectedCategory,
    selectedCategoryType,
  ]);


  useEffect(() => {
    if (!searchQuery) {
      if (sortBy === "All") {
        dispatch(fetchServices());
      } else {
        dispatch(fetchServices(sortBy));
      }
    } else {
      dispatch(searchServicesByName({ name: searchQuery, sortBy }));
    }
  }, [sortBy, currentPage, searchQuery, dispatch]);
  useEffect(() => {
    if (services.length > 0 && reviews.length > 0) {
      const serviceRatings = services.map((service) => {
        const serviceReviews = reviews.filter(
          (review) => review.service === service.id
        );
        const totalRating = serviceReviews.reduce(
          (acc, review) => acc + review.rate_star,
          0
        );
        const avgRating = serviceReviews.length
          ? totalRating / serviceReviews.length
          : 0;
        return { ...service, avgRating };
      });

      const sortedServices = serviceRatings.sort(
        (a, b) => b.avgRating - a.avgRating
      );
      setPopularServices(sortedServices.slice(0, 6)); // Select top 6
    }
  }, [services, reviews]);

  const toggleSortByDropdown = () => {
    setIsSortByOpen(!isSortByOpen);
  };

  const toggleCategoryDropdown = () => {
    setIsCategoryOpen(!isCategoryOpen);
  };

  const handleGridNavigate = () => {
    const queryParams = new URLSearchParams();

    if (searchQuery) {
      queryParams.set("query", searchQuery);
    }
    if (sortBy) {
      queryParams.set("sortBy", sortBy);
    }
    if (selectedCategory) {
      queryParams.set("category", selectedCategory.category_name);
    } else if (selectedCategoryType) {
      queryParams.set("categoryType", selectedCategoryType.name);
    }

    navigate(`/service?${queryParams.toString()}`);
  };


  const handleSortBy = (criteria) => {
    setSortBy(criteria);
    setCurrentPage(1);
    setIsSortByOpen(false);
  };

  const handleSortCriteria = (criteria) => {
    setSortCriteria(criteria);
    setCurrentPage(1);
    setIsCategoryOpen(false);

    const queryParams = new URLSearchParams();
    queryParams.set("query", searchQuery);
    queryParams.set("sortBy", criteria);

    if (selectedCategory) {
      queryParams.set("category", selectedCategory.category_name);
    } else if (selectedCategoryType) {
      queryParams.set("categoryType", selectedCategoryType.name);
    }

    navigate(`/service-filter?${queryParams.toString()}`);
  };

  const handleCategoryTypeHover = (typeId) => {
    setActiveCategoryType(typeId);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setIsSortByOpen(false);
    navigate(
      `/service-filter?query=${searchQuery}&category=${category.category_name}`
    );
  };

  const handleCategoryTypeSelect = (type) => {
    if (type === "All") {
      setSelectedCategoryType(null); // Reset the selected category type
      setSelectedCategory(null); // Reset the selected category
      setSortBy("All"); // Reset sort to "All"
      navigate(`/service-filter?query=${searchQuery}`);
    } else {
      setSelectedCategoryType(type);
      setActiveCategoryType(null);
      setSelectedCategory(null); // Reset the selected category when a new type is selected
      navigate(
        `/service-filter?query=${searchQuery}&sortBy=${sortBy}&categoryType=${type.name}`
      );
    }
  };

  const debouncedSearch = useMemo(
    () =>
      debounce((query) => {
        setSearchQuery(query);
        navigate(`/service?query=${query}`);
        dispatch(searchServicesByName(query));
      }, 800),
    [dispatch, navigate]
  );
  const handleCategoryTypeLeave = () => {
    setActiveCategoryType(null);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    debouncedSearch(query);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/service?query=${searchQuery}`);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleCategoryDropdownLeave = () => {
    setIsCategoryOpen(false);
  };

  const handleSortByDropdownLeave = () => {
    setIsSortByOpen(false);
  };


  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;

  const sortedServices = useMemo(() => {
    let sorted = [...services];
    if (sortCriteria === "Rating") {
      // Calculate average rating for each service
      const serviceRatings = sorted.map((service) => {
        const serviceReviews = reviews.filter(
          (review) => review.service === service.id
        );
        const totalRating = serviceReviews.reduce(
          (acc, review) => acc + review.rate_star,
          0
        );
        const avgRating = serviceReviews.length
          ? totalRating / serviceReviews.length
          : 0;
        return { ...service, avgRating };
      });

      // Sort by average rating
      serviceRatings.sort((a, b) => b.avgRating - a.avgRating);
      sorted = serviceRatings;
    } else if (sortCriteria === "Date") {
      sorted.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else if (sortCriteria === "A-Z") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    }
    return sorted;
  }, [services, reviews, sortCriteria]);

  const filteredServices = useMemo(() => {
    let filtered = sortedServices;

    if (selectedCategoryType) {
      filtered = filtered.filter(
        (service) => service.category.category_type === selectedCategoryType.id
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(
        (service) => service.category.category_name === selectedCategory.category_name
      );
    }

    if (searchQuery) {
      filtered = filtered.filter((service) =>
        service.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [sortedServices, searchQuery, selectedCategory, selectedCategoryType]);
  const currentServices = filteredServices.slice(
    indexOfFirstService,
    indexOfLastService
  );
  const totalPages = Math.ceil(filteredServices.length / servicesPerPage);

  if (serviceStatus === "loading") {
    return <LoadingComponent />;
  }

  if (serviceStatus === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="w-full overflow-hidden -mt-2 px-4 md:px-8 lg:px-24">
      <SlideService />
      <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between mt-6">
        <div className="w-full md:w-1/2 h-[90px] flex flex-col md:flex-row items-start md:items-center">
          <form className="w-full" onSubmit={handleSearch}>
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              {t("Search")}
            </label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="default-search"
                defaultValue={searchQuery}
                onChange={handleSearchChange}
                className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-2xl focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={t("Enter_the_Category")}
              />
              <button
                type="submit"
                className="absolute right-2.5 bottom-2.5 text-white bg-Secondary hover:bg-yellow-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-[#022278] dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                {t("Search")}
              </button>
            </div>
          </form>
        </div>


        <div className="flex flex-row flex-wrap items-center justify-center z-20 -mt-4 sm:mt-0">
          <div className="relative flex-shrink-0 mx-2">
            <button
              onClick={toggleSortByDropdown}
              className="flex justify-between border rounded-[8px] border-gray-500 w-full md:w-[150px]  pl-2 py-2 text-gray-500"
            >
              {selectedCategory
                ? selectedCategory.category_name
                : selectedCategoryType
                  ? selectedCategoryType.name
                  : "All"}
              <RiArrowDropDownLine className="text-2xl md:text-3xl" />
            </button>
            {isSortByOpen && (
              <ul className="absolute block bg-white border border-gray-500 dark:bg-gray-700 dark:border-gray-600 rounded-lg w-[170px] md:w-[180px] mt-2">
                <li
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer dark:text-gray-200 hover:dark:text-black"
                  onClick={() => handleCategoryTypeSelect("All")}
                >
                  All
                </li>
                {categoryTypes.map((categoryType) => (
                  <li
                    key={categoryType.id}
                    className="relative px-4 py-2 hover:bg-gray-200 cursor-pointer dark:text-gray-200 hover:dark:text-black"
                    onMouseEnter={() =>
                      handleCategoryTypeHover(categoryType.id)
                    }
                    onMouseLeave={handleCategoryTypeLeave} // Added this line to handle mouse leave
                    onClick={() => handleCategoryTypeSelect(categoryType)} // Select category type
                  >
                    {categoryType.name}
                    {activeCategoryType === categoryType.id && (
                      <ul className="block absolute left-full top-0 bg-white dark:bg-gray-800 mt-2 border border-gray-300 dark:border-gray-600 rounded-lg">
                        {categories
                          .filter(
                            (category) =>
                              category.category_type === categoryType.id
                          )
                          .map((category) => (
                            <li
                              key={category.id}
                              className="px-4 py-2 hover:bg-gray-200 cursor-pointer dark:text-gray-200 hover:dark:text-black"
                              onClick={(e) => {
                                e.stopPropagation(); // Prevents the category type from being deselected when selecting a category
                                handleCategorySelect(category);
                              }}
                            >
                              {category.category_name}
                            </li>
                          ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>


          <div className="relative flex-shrink-0 mx-2">
            <button
              onClick={toggleCategoryDropdown}
              className="flex justify-between border rounded-[8px] border-gray-500 w-full md:w-[150px]  pl-2 py-2 text-gray-500"
            >
              {sortCriteria || "Sort"}{" "}
              <RiArrowDropDownLine className="text-2xl md:text-3xl" />
            </button>
            {isCategoryOpen && (
              <ul className="absolute block bg-white border border-gray-500 dark:bg-gray-700 dark:border-gray-600 rounded-lg w-[150px] md:w-[150px] mt-2">
                <li
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer dark:text-gray-200 hover:dark:text-black"
                  onClick={() => handleSortCriteria("Rating")}
                >
                  Rating
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer dark:text-gray-200 hover:dark:text-black"
                  onClick={() => handleSortCriteria("Date")}
                >
                  Date
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer dark:text-gray-200 hover:dark:text-black"
                  onClick={() => handleSortCriteria("A-Z")}
                >
                  A-Z
                </li>
              </ul>
            )}
          </div>

          <div className="flex flex-shrink-0 mx-2">
            <button
              onClick={handleGridNavigate}
              className="flex justify-center items-center border border-gray-500 rounded-l-lg h-[48px] w-[40px] md:w-[50px] sm:w-[50px] lg:w-[50px] text-black  "
            >
              <TbGridDots className="dark:text-gray-500 " />
            </button>

            <button className="flex justify-center items-center border border-gray-500 rounded-r-lg  h-[48px] w-[40px] lg:w-[50px] md:w-[50px] sm:w-[50px] bg-Secondary dark:bg-Primary text-black dark:text-gray-500">
              <FaList className="text-white" />
            </button>
          </div>
        </div>
      </div>

        <div className="w-full h-full flex flex-wrap justify-center items-center mt-5 mb-5">
          {currentServices.length === 0 ? (
            <div>No services available</div>
          ) : (
            <div className="flex justify-around flex-wrap ">
              {" "}
              {currentServices.map((service) => {
                const serviceReviews = reviews.filter(
                  (review) => review.service === service.id
                );
                return (
                  <HorizontalCard
                    key={service.id}
                    id={service.id}
                    image={service.image}
                    name={service.name}
                    created_at={service.created_at}
                    description={service.description}
                    category={service.category.category_name}
                    location={`${service.location.province}, ${service.location.district}, ${service.location.commune}, ${service.location.village}`}
                    working_days={
                      Array.isArray(service.working_days)
                        ? service.working_days.join(", ")
                        : service.working_days
                    }
                    reviews={serviceReviews}
                  />
                );
              })}{" "}
            </div>
          )}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
  );
};
