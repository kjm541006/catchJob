package com.project.catchJob.domain.project;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString(exclude = "project")
@Entity
public class P_member {

	@Id @GeneratedValue
	private Long pMemId; // ���͵�����ο� ���̵�
	
	private String pMemJob; // ����
	
	private int pMemCnt; // �����ο�
	
	@ManyToOne
	@JoinColumn(name = "project_id", nullable = false, updatable = false)
	private Project project;
	
	public void setProject(Project project) {
		this.project = project;
		project.getProjectMemberList().add(this);
	}
}
