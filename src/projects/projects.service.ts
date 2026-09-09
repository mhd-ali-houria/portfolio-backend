import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto.js';
import { UpdateProjectDto } from './dto/update-project.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity.js';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    return await this.projectRepository.save(createProjectDto);
  }

  findAll() {
    return this.projectRepository.find();
  }

  async findOne(id: number) {
    const project = await this.projectRepository.findOneBy({ id: id });
    if (!project) throw new NotFoundException('project not found');
    return project;
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    const project = await this.findOne(id);
    if (!project) throw new NotFoundException('project not found');
    await this.projectRepository.update(id, updateProjectDto);
  }

  async remove(id: number) {
    const project = await this.findOne(id);
    if (!project) throw new NotFoundException('project not found');
    return this.projectRepository.delete(id);
  }
}
