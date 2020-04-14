import React from "react";
import { render, queryByAttribute } from "@testing-library/react";
import Wrapper from "./Wrapper";

const mockHistoryPush = jest.fn();
jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

test("renders it's inner contents", () => {
  const dom = render(
    <Wrapper leftArrowText="back">
      <div>Hello!</div>
    </Wrapper>
  );

  const textContents = dom.getByText("Hello!");

  expect(textContents).toBeInTheDocument();
});

test("renders navBar when given navTitle", () => {
  const dom = render(
    <Wrapper navTitle="CHI">
      <div>Hello!</div>
    </Wrapper>
  );

  const getById = queryByAttribute.bind(null, "id");
  const renderedNavBar = getById(dom.container, "nav-bar");
  const navTitle = dom.getByText("CHI");

  expect(renderedNavBar).toBeTruthy();
  expect(navTitle).toBeInTheDocument();
});

test("renders no navBar when not given props", () => {
  const dom = render(
    <Wrapper>
      <div>Hello!</div>
    </Wrapper>
  );
  const getById = queryByAttribute.bind(null, "id");
  const renderedNavBar = getById(dom.container, "nav-bar");
  expect(renderedNavBar).toBeFalsy();
});

test("renders leftArrowText", () => {
  const dom = render(
    <Wrapper leftArrowText="back">
      <div>Hello!</div>
    </Wrapper>
  );

  const leftArrowText = dom.getByText("back");

  expect(leftArrowText).toBeInTheDocument();
});
