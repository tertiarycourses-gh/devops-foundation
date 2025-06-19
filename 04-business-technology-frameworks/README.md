# Topic 4: Business and Technology Frameworks

## Overview

This topic covers business and technology frameworks essential for DevOps success, including Agile & Lean methodologies, IT Service Management (ITSM/ITIL), Safety Culture, and Building Learning Organizations.

## Learning Objectives

- Understand Agile and Lean methodologies in DevOps context
- Learn IT Service Management principles
- Practice Agile planning and project management
- Develop safety culture awareness
- Build learning organization practices

## Lab Activity: Agile Planning with Project Management Tools

### Prerequisites

- Internet access
- GitHub account (free)
- Trello account (free) or Jira Cloud account
- Basic understanding of Agile concepts

### Project Overview

We'll create an Agile project management setup for a DevOps transformation project, demonstrating how to use modern tools to implement Agile and Lean practices.

### Option 1: GitHub Projects (Recommended)

#### 1. Create GitHub Repository

1. Go to GitHub.com and create a new repository
2. Name it `devops-agile-demo`
3. Make it public
4. Enable GitHub Projects in repository settings

#### 2. Set Up GitHub Project Board

1. Go to your repository
2. Click on "Projects" tab
3. Click "New project"
4. Choose "Board" template
5. Name it "DevOps Transformation Project"

#### 3. Create Project Structure

Set up the following columns:

- **Backlog**: Future work items
- **To Do**: Ready to start
- **In Progress**: Currently being worked on
- **Review**: Ready for review/testing
- **Done**: Completed work

#### 4. Create Sample User Stories

Add the following issues to your project:

**Epic: Infrastructure Automation**

- Story: Set up CI/CD pipeline for web application
- Story: Implement automated testing framework
- Story: Configure monitoring and alerting

**Epic: Security Implementation**

- Story: Integrate security scanning in CI/CD
- Story: Implement secrets management
- Story: Set up vulnerability scanning

**Epic: Team Collaboration**

- Story: Establish code review process
- Story: Create team documentation standards
- Story: Set up communication channels

#### 5. Add Detailed Story Information

For each story, include:

- **Description**: Detailed requirements
- **Acceptance Criteria**: Clear success criteria
- **Story Points**: Effort estimation (1-8 points)
- **Labels**: Categorization (e.g., "frontend", "backend", "infrastructure")
- **Assignees**: Team members responsible
- **Milestones**: Target completion dates

### Option 2: Trello Setup

#### 1. Create Trello Board

1. Go to Trello.com and sign in
2. Click "Create new board"
3. Name it "DevOps Transformation Project"
4. Choose "Agile" template

#### 2. Customize Board Structure

Rename columns to:

- **Product Backlog**
- **Sprint Backlog**
- **In Progress**
- **Code Review**
- **Testing**
- **Done**

#### 3. Create Cards

Add cards for each user story with:

- **Title**: Clear, concise description
- **Description**: Detailed requirements
- **Checklist**: Acceptance criteria
- **Labels**: Color-coded categories
- **Due Date**: Target completion
- **Members**: Assigned team members

### Option 3: Jira Cloud Setup

#### 1. Create Jira Project

1. Go to your Jira Cloud instance
2. Click "Create project"
3. Choose "Software development" template
4. Select "Scrum" methodology
5. Name it "DevOps Transformation"

#### 2. Configure Issue Types

Set up the following issue types:

- **Epic**: Large initiatives
- **Story**: User stories
- **Task**: Implementation tasks
- **Bug**: Issues to fix
- **Subtask**: Smaller work items

#### 3. Create Sprint Structure

- **Sprint 1**: Infrastructure Setup (2 weeks)
- **Sprint 2**: CI/CD Implementation (2 weeks)
- **Sprint 3**: Security Integration (2 weeks)
- **Sprint 4**: Monitoring & Testing (2 weeks)

### Lab Steps

#### Step 1: Project Setup

1. Choose your preferred tool (GitHub Projects, Trello, or Jira)
2. Create the project structure as outlined above
3. Set up team members and permissions

#### Step 2: Create User Stories

Create detailed user stories for a DevOps transformation project:

**Example Story:**

```
Title: Set up CI/CD pipeline for web application
Type: Story
Priority: High
Story Points: 5
Description:
As a development team
I want an automated CI/CD pipeline
So that code changes are automatically tested and deployed

Acceptance Criteria:
- Pipeline triggers on code push to main branch
- Automated unit tests run successfully
- Code quality checks pass
- Application builds successfully
- Deployment to staging environment is automated
- Pipeline provides clear feedback on success/failure

Tasks:
- [ ] Set up GitHub Actions workflow
- [ ] Configure automated testing
- [ ] Set up staging environment
- [ ] Configure deployment automation
- [ ] Document pipeline process
```

#### Step 3: Sprint Planning

1. **Create Sprint Backlog**:

   - Select stories for the current sprint
   - Estimate story points
   - Assign team members
   - Set sprint goals

2. **Define Sprint Goals**:
   - Sprint 1: "Establish basic DevOps infrastructure"
   - Sprint 2: "Implement automated testing and deployment"
   - Sprint 3: "Add security and monitoring capabilities"

#### Step 4: Daily Standup Simulation

Practice daily standup meetings:

1. **What did you work on yesterday?**
2. **What will you work on today?**
3. **Are there any blockers?**

#### Step 5: Sprint Review and Retrospective

1. **Sprint Review**:

   - Demo completed work
   - Gather stakeholder feedback
   - Update product backlog

2. **Sprint Retrospective**:
   - What went well?
   - What could be improved?
   - Action items for next sprint

### Advanced Features to Implement

#### 1. Automation Integration

- Connect your project tool with CI/CD pipelines
- Set up automated issue creation from failed builds
- Configure status updates based on deployment status

#### 2. Metrics and Reporting

- Track velocity (story points completed per sprint)
- Monitor burndown charts
- Generate team performance reports

#### 3. Integration with Development Tools

- Link issues to code commits
- Connect with code review tools
- Integrate with testing frameworks

### Expected Deliverables

#### 1. Project Board

- Complete project structure
- User stories with detailed descriptions
- Sprint planning and backlog management

#### 2. Documentation

- Project charter
- Team working agreement
- Definition of Done
- Sprint planning templates

#### 3. Metrics Dashboard

- Velocity tracking
- Burndown charts
- Team capacity planning

### Discussion Questions

1. **Agile Principles**:

   - How does this setup support Agile values?
   - What are the benefits of iterative development?

2. **Lean Thinking**:

   - How can we identify and eliminate waste?
   - What value stream mapping opportunities exist?

3. **Safety Culture**:

   - How does this process support psychological safety?
   - What mechanisms exist for learning from failures?

4. **Continuous Learning**:
   - How can the team improve through retrospectives?
   - What knowledge sharing practices should be implemented?

### Best Practices

#### 1. User Story Writing

- Use "As a... I want... So that..." format
- Keep stories small and focused
- Include clear acceptance criteria

#### 2. Sprint Planning

- Don't overcommit
- Consider team capacity
- Include buffer for unexpected work

#### 3. Daily Standups

- Keep them short (15 minutes max)
- Focus on blockers and collaboration
- Update story status regularly

#### 4. Retrospectives

- Be honest and constructive
- Focus on actionable improvements
- Follow up on action items

### Troubleshooting

#### Common Issues

- **Over-commitment**: Reduce story points or extend sprint duration
- **Scope creep**: Refer back to sprint goals and product backlog
- **Poor estimation**: Use historical data and team consensus
- **Communication gaps**: Ensure regular updates and clear documentation

#### Tools Integration

- **GitHub**: Use issue templates and automation
- **Trello**: Leverage power-ups for enhanced functionality
- **Jira**: Configure workflows and automation rules

## Additional Resources

- [Agile Manifesto](https://agilemanifesto.org/)
- [Scrum Guide](https://scrumguides.org/)
- [Lean Software Development](https://www.lean.org/)
- [ITIL Framework](https://www.axelos.com/best-practice-solutions/itil)
- [GitHub Projects Documentation](https://docs.github.com/en/issues/planning-and-tracking-with-projects)
- [Trello Guide](https://trello.com/guide)
- [Jira Software Documentation](https://www.atlassian.com/software/jira/guides)
