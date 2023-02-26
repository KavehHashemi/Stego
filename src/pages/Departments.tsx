import { useEffect, useState } from 'react';
import { BottomScrollListener } from 'react-bottom-scroll-listener';

import ArtworksList from '../components/ArtworksList';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getCollections, getDepartmentsArtworks, IncrementIndex, ResetCollection, ResetIndex } from '../store/artworks';

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
        console.log(`current department is ${currentDepartment.displayName}`);
      }
    })();
    dispatch(ResetCollection());
    dispatch(ResetIndex());
  }, [currentDepartment]);

  useEffect(() => {
    console.log(`index is ${index}`);
    (async () => {
      dispatch(getCollections(index));
      // let a = await getCollection(index);
      // setCollection(collection.concat(a));
    })();
  }, [index]);

  return (
    <>
      <div className="container">
        <div>{currentDepartment?.displayName}</div>
        <div>{artworksCount}</div>

        <div className="container">
          <ArtworksList artworks={collection}></ArtworksList>
        </div>
      </div>
      <BottomScrollListener onBottom={() => dispatch(IncrementIndex())} />
    </>
  );
};

export default Departments;
