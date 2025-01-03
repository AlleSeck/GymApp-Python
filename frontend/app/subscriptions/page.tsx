import React from "react"

export default () => {

  const tableItems = [
      {
          name: "toto",
          date: "Oct 9, 2023",
          status: "Active",
          price: "35 euros",
          plan: "Monthly subscription"
      },
      {
          name: "titi",
          date: "Oct 12, 2023",
          status: "Active",
          price: "35 euros",
          plan: "Monthly subscription"
      },
      {
          name: "tutu",
          date: "Oct 22, 2023",
          status: "Archived",
          price: "420 euros",
          plan: "Annually subscription"
      },
      {
          name: "tata",
          date: "Jan 5, 2023",
          status: "Active",
          price: "35 euros",
          plan: "Monthly subscription"
      },
      {
          name: "tete",
          date: "Jan 6, 2023",
          status: "Active",
          price: "420 euros",
          plan: "Annually subscription"
      },
  ]


  return (
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
          <div className="items-start justify-between md:flex">
              <div className="max-w-lg">
                  <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                      All Members
                  </h3>
                  <p className="text-gray-600 mt-2">
                      Les membres de votre salle de sport
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
          <div className="mt-12 relative h-max overflow-auto">
              <table className="w-full table-auto text-sm text-left">
                  <thead className="text-gray-600 font-medium border-b">
                      <tr>
                          <th className="py-3 pr-6">name</th>
                          <th className="py-3 pr-6">date</th>
                          <th className="py-3 pr-6">status</th>
                          <th className="py-3 pr-6">Purchase</th>
                          <th className="py-3 pr-6">price</th>
                          <th className="py-3 pr-6"></th>
                      </tr>
                  </thead>
                  <tbody className="text-gray-600 divide-y">
                      {
                          tableItems.map((item, idx) => (
                              <tr key={idx}>
                                  <td className="pr-6 py-4 whitespace-nowrap">{item.name}</td>
                                  <td className="pr-6 py-4 whitespace-nowrap">{item.date}</td>
                                  <td className="pr-6 py-4 whitespace-nowrap">
                                      <span className={`px-3 py-2 rounded-full font-semibold text-xs ${item.status == "Active" ? "text-green-600 bg-green-50" : "text-blue-600 bg-blue-50"}`}>
                                          {item.status}
                                      </span>
                                  </td>
                                  <td className="pr-6 py-4 whitespace-nowrap">{item.plan}</td>
                                  <td className="pr-6 py-4 whitespace-nowrap">{item.price}</td>
                                  <td className="text-right whitespace-nowrap">
                                      <a href="javascript:void()" className="py-1.5 px-3 text-gray-600 hover:text-gray-500 duration-150 hover:bg-gray-50 border rounded-lg">
                                          Manage
                                      </a>
                                  </td>
                              </tr>
                          ))
                      }
                  </tbody>
              </table>
          </div>
      </div>
  )
}