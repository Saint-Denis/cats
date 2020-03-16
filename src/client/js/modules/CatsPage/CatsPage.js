import React, { Component, Fragment } from "react";
import Select from "react-select";
import Loader from "react-loader-spinner";
import Button from "../../components/Button";
import CatItem from "./components/CatItem";
import setOptions from "./utils";
import { selectTypeOptions, selectOrderOptions } from "./config";
import api from "./api";

class CatsPage extends Component<> {
  mounted: false;

  state = {
    categories: [],
    breeds: [],
    imagesList: [],
    selectedCategoriesOption: null,
    selectedBreedsOption: null,
    selectedTypeOption: null,
    randomCat: null,
    isLoading: false
  };

  componentDidMount() {
    const { categories } = this.state;
    this.mounted = true;
    this.fetchAllCatsData();
    this.getPageImages();
  }

  componentWillReceiveProps() {
    this.mounted = false;
  }

  getPageImages = async (breedId, ...rest) => {
    this.setState({
      isLoading: true
    });

    try {
      const imagesList = await api.getImages(breedId, ...rest);

      this.mounted &&
        this.setState({
          imagesList: imagesList.data,
          isLoading: false
        });
    } catch (e) {}
  };

  fetchAllCatsData = async () => {
    this.setState({
      isLoading: true
    });

    try {
      const categories = await api.getCatsCategories();
      const breeds = await api.getCatsBreeds();

      this.mounted &&
        this.setState({
          categories: categories.data,
          breeds: breeds.data,
          isLoading: false
        });
    } catch (e) {}
  };

  handleRandomCat = async () => {
    const { breeds } = this.state;
    const breedsCount = breeds.length;
    const randomDigit = Math.floor(Math.random() * breedsCount);
    const randomBreedsId = breeds[randomDigit].id;

    try {
      const randomCat = await api.getSpecificBreed(randomBreedsId);
      this.mounted &&
        this.setState({
          randomCat: randomCat.data,
          imagesList: null
        });
    } catch (e) {}
  };

  handleSelectCat = () => {
    const {
      selectedTypeOption,
      selectedCategoriesOption,
      selectedBreedsOption
    } = this.state;

    const type = selectedTypeOption && selectedTypeOption.value;
    const categoryId = selectedCategoriesOption && selectedCategoriesOption.id;
    const breedId = selectedBreedsOption && selectedBreedsOption.id;

    this.getPageImages(breedId, type, categoryId);
  };

  handleCategoriesChange = selectedCategoriesOption => {
    this.setState({ selectedCategoriesOption, randomCat: null }, () =>
      this.handleSelectCat()
    );
  };

  handleTypeChange = selectedTypeOption => {
    this.setState({ selectedTypeOption, randomCat: null }, () =>
      this.handleSelectCat()
    );
  };

  handleBreeedsChange = selectedBreedsOption => {
    this.setState({ selectedBreedsOption, randomCat: null }, () =>
      this.handleSelectCat()
    );
  };

  render() {
    const {
      categories,
      breeds,
      selectedCategoriesOption,
      selectedBreedsOption,
      selectedTypeOption,
      imagesList,
      randomCat,
      isLoading
    } = this.state;

    const isCatsExist = imagesList && !!imagesList.length;
    const isRandomCatExist = randomCat && !!randomCat.length;

    return (
      <Fragment>
        <h1>CatsPage</h1>
        <section className="cats-page">
          <div className="cats-page__selects">
            <div className="cats-page__select">
              <div className="cats-page__select-name">Категории</div>
              <Select
                defaultValue="none"
                placeholder="none"
                value={selectedCategoriesOption}
                options={setOptions(categories)}
                onChange={this.handleCategoriesChange}
              />
            </div>
            <div className="cats-page__select">
              <div className="cats-page__select-name">Породы</div>
              <Select
                defaultValue="none"
                placeholder="none"
                value={selectedBreedsOption}
                options={setOptions(breeds)}
                onChange={this.handleBreeedsChange}
              />
            </div>
            <div className="cats-page__select">
              <div className="cats-page__select-name">Tип</div>
              <Select
                defaultValue="all"
                placeholder="all"
                value={selectedTypeOption}
                options={selectTypeOptions}
                onChange={this.handleTypeChange}
              />
            </div>
          </div>
          <div className="cats-page__separator">Или</div>
          <div className="cats-page__random">
            <div className="cats-page__random-name">Один рандомный котик</div>
            <Button handleRandomCat={this.handleRandomCat} text="Мяу" />
          </div>
          {isLoading ? (
            <Loader
              color="#4c68d7"
              type="Bars"
              height={80}
              width={80}
              timeout={3000}
            />
          ) : !isCatsExist && !isRandomCatExist ? (
            <div className="cats-page__empty">
              Извините, но нет котиков, подходящих под условия :(
            </div>
          ) : isRandomCatExist ? (
            <CatItem
              isRandomCatExist={isRandomCatExist}
              url={randomCat[0].url}
            />
          ) : (
            <ul className="cats-page__list">
              {imagesList.map(image => {
                return (
                  <li>
                    <CatItem key={image.id} url={image.url} />
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </Fragment>
    );
  }
}

export default CatsPage;
