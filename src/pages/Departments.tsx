/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { BottomScrollListener } from 'react-bottom-scroll-listener';

import { Artwork } from '../../types';
import ArtworksList from '../components/ArtworksList';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getDepartmentsArtworks, IncrementIndex, ResetIndex } from '../store/artworks';
import { getCollection } from '../utils';

const Departments = () => {
  const dispatch = useAppDispatch();

  const { currentDepartment } = useAppSelector((state) => state.departments);
  const { artworksCount, index } = useAppSelector((state) => state.artworks);

  const [collection, setCollection] = useState<Artwork[]>([]);

  useEffect(() => {
    if (currentDepartment) {
      setCollection([]);
      dispatch(ResetIndex());
      console.log(`current department is ${currentDepartment.displayName}`);
      dispatch(getDepartmentsArtworks(currentDepartment.departmentId));
    }
  }, [currentDepartment]);

  useEffect(() => {
    console.log(`index is ${index}`);
    (async () => {
      let a = await getCollection(index);
      setCollection(collection.concat(a));
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
