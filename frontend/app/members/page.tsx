'use client';

import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

interface Member {   
    _id: string;
    firstname: string;
    lastname: string;
    phone: string;
    email: string;
    subscription: boolean;
}

const MembersPage = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/users');
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setMembers(data);
      } catch (error) {
        setError((error as Error).message);
      }
    };

    fetchMembers();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this member?')) {
      return;
    }

    const token = Cookies.get('accessToken');
    if (!token) {
      setError('Authentication token not found. Please log in again.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/api/users/${id}`, {
        method: 'DELETE',
        headers: {
          'x-auth-token': token,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      setMembers(members.filter(member => member._id !== id));
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8">
      <div className="items-start justify-between md:flex">
        <div className="max-w-lg">
          <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
            Team members
          </h3>
          <p className="text-gray-600 mt-2">
            Manage your team members
          </p>
        </div>
        <div className="mt-3 md:mt-0">
          <a
            href="javascript:void(0)"
            className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
          >
            Add member
          </a>
        </div>
      </div>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6">First Name</th>
              <th className="py-3 px-6">Last Name</th>
              <th className="py-3 px-6">Phone</th>
              <th className="py-3 px-6">Email</th>
              <th className="py-3 px-6">Subscription</th>
              <th className="py-3 px-6">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {members.map((member) => (
              <tr key={member._id}>
                <td className="px-6 py-4 whitespace-nowrap">{member.firstname}</td>
                <td className="px-6 py-4 whitespace-nowrap">{member.lastname}</td>
                <td className="px-6 py-4 whitespace-nowrap">{member.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap">{member.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{member.subscription ? "Subscribed" : "Not Subscribed"}</td>
                <td className="text-right px-6 whitespace-nowrap">
                  <a href="javascript:void(0)" className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg">
                    Edit
                  </a>
                  <button
                    onClick={() => handleDelete(member._id)}
                    className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MembersPage;
