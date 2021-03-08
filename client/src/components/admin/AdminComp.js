import React from "react";
import { Admin, Resource } from "react-admin";
import authProvider from "./authProvider";
import { BlogCreate, BlogEdit, BlogList, BlogShow } from "./Blog";
import { ComponentCreate, ComponentEdit, ComponentList } from "./Component";
import { IssueEdit, IssueList } from "./Issues";
import {
  ProjectCreate,
  ProjectEdit,
  ProjectList,
  ProjectShow,
} from "./Project";
import {
  AchievementList,
  AchievementCreate,
  AchievementEdit,
  AchievementShow,
} from "./Achievement";
import { NewsCreate, NewsEdit, NewsList, NewsShow } from "./News";
import {
  WorkshopCreate,
  WorkshopEdit,
  WorkshopList,
  WorkshopShow,
} from "./Workshop";
import { UserList, UserShow, UserEdit } from "./Users";
import { useSelector } from "react-redux";
import { dataProvider } from "./dataProvider";
import { history } from "../../ConfigureStore";

function AdminComp() {
  document.title = "Admin Panel | Aero Club";

  const user = useSelector(state => state.user)

  return (
    <>
      <Admin
        authProvider={authProvider}
        dataProvider={dataProvider}
        history={history}
      >
        <Resource
          name="users"
          list={UserList}
          show={UserShow}
          edit={user?.role === "Super-admin" ? UserEdit : null}
        />
        <Resource
          name="projects"
          list={ProjectList}
          create={ProjectCreate}
          edit={ProjectEdit}
          show={ProjectShow}
        />
        <Resource
          name="blogs"
          list={BlogList}
          create={BlogCreate}
          edit={BlogEdit}
          show={BlogShow}
        />
        <Resource
          name="achievement"
          list={AchievementList}
          create={AchievementCreate}
          edit={AchievementEdit}
          show={AchievementShow}
        />
        <Resource name="issue" list={IssueList} edit={IssueEdit} />
        <Resource
          name="component"
          list={ComponentList}
          create={ComponentCreate}
          edit={ComponentEdit}
        />
        <Resource
          name="news"
          list={NewsList}
          create={NewsCreate}
          edit={NewsEdit}
          show={NewsShow}
        />
        <Resource
          name="workshop"
          list={WorkshopList}
          create={WorkshopCreate}
          edit={WorkshopEdit}
          show={WorkshopShow}
        />
      </Admin>
    </>
  );
}

export default AdminComp;
