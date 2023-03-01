/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { BottomScrollListener } from "react-bottom-scroll-listener";

import ArtworksList from "../components/ArtworksList";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  getCollections,
  getDepartmentsArtworks,
  IncrementIndex,
  ResetCollection,
  ResetIndex,
} from "../store/artworks";

const Departments = () => {
  const dispatch = useAppDispatch();

  const { currentDepartment } = useAppSelector((state) => state.departments);
  const { artworksCount, index, collection } = useAppSelector(
    (state) => state.artworks
  );

  useEffect(() => {
    (async () => {
      if (currentDepartment) {
        await dispatch(getDepartmentsArtworks(currentDepartment.departmentId));
        await dispatch(getCollections(index));
      }
    })();
  }, []);

  useEffect(() => {
    dispatch(ResetCollection());
    dispatch(ResetIndex());
  }, [currentDepartment]);

  useEffect(() => {
    (async () => {
      await dispatch(getCollections(index));
    })();
  }, [index]);

  // useEffect(() => {
  //   (async () => {
  //     await dispatch(getCollections(index));
  //   })();
  // }, [artworksCount]);

  useEffect(() => {
    // console.log(`collection changed`);
  }, [collection]);

  return (
    <>
      <div className="container">
        <div>{currentDepartment?.displayName}</div>
        <div>{artworksCount} items</div>
        <div className="container">
          <ArtworksList></ArtworksList>
        </div>
      </div>
      <BottomScrollListener onBottom={() => dispatch(IncrementIndex())} />
    </>
  );
};

export default Departments;
