import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Appbar from '../components/Appbar';
import GitHubIcon from '../components/icons/Github';
import { GITHUB_CONTRIBUTOR_URL } from '../config';
import { SkeletonContributorGrid } from '../skeletons/SkeletonContributor';

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
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">Contributors</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
          {contributors.map((contributor: any) => (
            <a
              key={contributor?.id}
              href={contributor?.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-lg p-4 flex flex-col items-center justify-center transform transition-transform duration-300 hover:scale-105 shadow-2xl"
              style={{ boxShadow: '0 0 20px -10px rgba(0, 0, 0, 0.4)' }}
            >
              <div className="bg-gray-200 w-20 h-20 rounded-full flex items-center justify-center mb-4 overflow-hidden">
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
    </>
  );
};

export default Contributors;
