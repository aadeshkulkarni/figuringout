import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Appbar from '../components/Appbar';
import GitHubIcon from '../components/icons/Github';
import { GITHUB_CONTRIBUTOR_URL } from '../config';
import { SkeletonContributorGrid } from '../skeletons/SkeletonContributor';
import { Link } from 'react-router-dom';

const Contributors: React.FC = () => {
  const [contributors, setContributors] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(GITHUB_CONTRIBUTOR_URL);
        setContributors(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching contributors', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <>
        <Appbar skipAuthCheck={true} />
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-8">Contributors</h1>
          <SkeletonContributorGrid />
        </div>
      </>
    );
  }

  return (
    <>
      <Appbar skipAuthCheck={true} />
      <div className="container p-4 flex flex-col justify-center items-center w-screen">
        <h1 className="text-2xl mb-4 text-center">Contributors</h1>
        <div className="md:w-4/5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {contributors.map((contributor: any) => (
            <a
              key={contributor?.id}
              href={contributor?.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white p-4 flex flex-col items-center justify-center transform transition-transform duration-300 hover:scale-105 border border-gray-100"
            >
              <div className="bg-gray-200 w-full h-full flex items-center justify-center mb-4 overflow-hidden">
                <img src={contributor?.avatar_url} alt={contributor?.login} className="w-full h-full object-cover" />
              </div>

              <div className="text-center">
                <div className="px-20">
                  <GitHubIcon />
                </div>

                <h2 className="text-lg font-medium">{contributor.login}</h2>
                <p className="text-gray-600">{contributor?.contributions} contributions</p>
              </div>
            </a>
          ))}
        </div>
      </div>
      <div className="bg-gray-50 border text-gray-700 w-full p-4 text-center">
          <div className="py-4">If you would like to contribute to the project, you can do it by clicking on this link.</div>
          <Link className="px-4 py-2 bg-black text-white rounded-full text-xs" to="https://github.com/aadeshkulkarni/medium-app">Contribute</Link>
        </div>
    </>
  );
};

export default Contributors;
