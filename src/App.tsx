import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import DefaultLayout from './layout/DefaultLayout';
import Country from './pages/Country/CountryForm';
import Category from './pages/Category/CategoryForm';
import Region from './pages/Region/RegionFormPage';
import News from './pages/News/NewsForm';
import CountryFormPage from './pages/Country/CountryFormPage';
import RegionFormPage from './pages/Region/RegionFormPage';
import CategoryFormPage from './pages/Category/CategoryFormPage';
import NewsFormPage from './pages/News/NewsFormPage';
import SubCategoryFormPage from './pages/SubCategory/SubCategoryFormPage';
import PublicNewsFormPage from './pages/PublicNews/PublicNewsPage';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <Routes>
        <Route
          index
          element={
            <>
              <PageTitle title="eCommerce Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <ECommerce />
            </>
          }
        />
        <Route
          path="/news"
          element={
            <>
              <PageTitle title="Country " />
              <PublicNewsFormPage />
            </>
          }
        />
        <Route
          path="/admin/countries"
          element={
            <>
              <PageTitle title="Country " />
              <CountryFormPage />
              {/* <Country  country={{ name: "India", isActive: true }} /> */}
            </>
          }
        />
        <Route
          path="/admin/regions"
          element={
            <>
              <PageTitle title="Region " />
              <RegionFormPage />
              {/* <Region region={{ name: "Haryana", isActive: true }} /> */}
            </>
          }
        />
        <Route
          path="/admin/categories"
          element={
            <>
              <PageTitle title="Category " />
              <CategoryFormPage />
              {/* <Category category={{ name: "Sports" }} /> */}
            </>
          }
        />
        <Route
          path="/admin/subcategories"
          element={
            <>
              <PageTitle title="Sub Category " />
              <SubCategoryFormPage />
              {/* <Category category={{ name: "Sports" }} /> */}
            </>
          }
        />
        <Route
          path="/admin/news"
          element={
            <>
              <PageTitle title="News " />
              <NewsFormPage />
              {/* <News news={{ id: 1, title: "Breaking News", content: "This is breaking news...", author_name: "John Doe", is_global: true}} /> */}
            </>
          }
        />
        <Route
          path="/calendar"
          element={
            <>
              <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Calendar />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Profile />
            </>
          }
        />
        <Route
          path="/forms/form-elements"
          element={
            <>
              <PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <FormElements />
            </>
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            <>
              <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <FormLayout />
            </>
          }
        />
        <Route
          path="/tables"
          element={
            <>
              <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Tables />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Settings />
            </>
          }
        />
        <Route
          path="/chart"
          element={
            <>
              <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Chart />
            </>
          }
        />
        <Route
          path="/ui/alerts"
          element={
            <>
              <PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Alerts />
            </>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <>
              <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Buttons />
            </>
          }
        />
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignUp />
            </>
          }
        />
      </Routes>
    </DefaultLayout>
  );
}

export default App;
