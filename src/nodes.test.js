import { JobPostNode, DepartmentNode } from "./nodes";

describe("Creating a job post node", () => {
  const rawJobPost = {
    title: "Test Job Post Node",
    id: "1234",
  };
  const jobPostNode = JobPostNode(rawJobPost);

  it("creates a slug from the title", () => {
    expect(jobPostNode).toMatchObject({
      title: "Test Job Post Node",
      slug: "test-job-post-node",
    });
  });

  it("adds internal gatsby node properties", () => {
    expect(jobPostNode).toMatchObject({
      children: [],
      greenhouseId: "1234",
      id: "Greenhouse__JobPost__1234",
      internal: {
        type: "GreenhouseJobPost",
      },
      parent: "__SOURCE__",
    });

    expect(jobPostNode).toHaveProperty("internal.contentDigest");
  });
});

describe("Creating a department node", () => {
  const rawDepartmentNode = {
    name: "Test Department Node",
    id: "DEPT_1",
    jobPosts: [
      {
        title: "Job Post 1",
        id: "JOB_1",
      },
      {
        title: "Job Post 2",
        id: "JOB_2",
      },
    ],
  };
  const departmentNode = DepartmentNode(rawDepartmentNode);

  it("creates a slug from the name", () => {
    expect(departmentNode).toMatchObject({
      name: "Test Department Node",
      slug: "test-department-node",
    });
  });

  it("adds generated job post ids to the children array", () => {
    expect(departmentNode).toMatchObject({
      children: ["Greenhouse__JobPost__JOB_1", "Greenhouse__JobPost__JOB_2"],
    });
  });

  it("adds internal gatsby node properties", () => {
    expect(departmentNode).toMatchObject({
      jobPosts: [
        { title: "Job Post 1", id: "JOB_1" },
        { title: "Job Post 2", id: "JOB_2" },
      ],
      greenhouseId: "DEPT_1",
      id: "Greenhouse__Department__DEPT_1",
      parent: "__SOURCE__",
      internal: {
        type: "GreenhouseDepartment",
      },
      slug: "test-department-node",
    });

    expect(departmentNode).toHaveProperty("internal.contentDigest");
    expect(departmentNode).toHaveProperty("children");
  });
});
